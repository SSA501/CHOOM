package com.choom.domain.dance.service;

import com.choom.domain.bookmark.entity.BookmarkRepository;
import com.choom.domain.dance.dto.AddDanceResponseDto;
import com.choom.domain.dance.dto.DanceDetailsWithRankDto;
import com.choom.domain.dance.dto.DanceDetailsDto;
import com.choom.domain.dance.dto.DanceSearchDto;
import com.choom.domain.dance.dto.PopularDanceDto;
import com.choom.domain.dance.dto.DanceRankUserDto;
import com.choom.domain.dance.dto.DanceStatusDto;
import com.choom.domain.dance.entity.Dance;
import com.choom.domain.dance.entity.DanceRepository;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.user.entity.User;
import com.choom.global.service.FileService;
import com.choom.global.service.YoutubeService;
import com.querydsl.core.Tuple;
import com.sapher.youtubedl.YoutubeDL;
import com.sapher.youtubedl.YoutubeDLException;
import com.sapher.youtubedl.YoutubeDLRequest;
import com.sapher.youtubedl.YoutubeDLResponse;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DanceService {

    private final DanceRepository danceRepository;
    private final MyDanceRepository myDanceRepository;
    private final BookmarkRepository bookmarkRepository;
    private final FileService fileService;
    private final YoutubeService youtubeService;

    private static final String GOOGLE_YOUTUBE_URL = "https://www.youtube.com/shorts/";

    @Transactional
    public DanceSearchDto searchDance(Long userId, String keyword, String pageToken, Long size) {
        log.info("Starting YouTube search... " + keyword + " pageToken : " + pageToken);

        List<DanceDetailsDto> danceDetailDtoList = new ArrayList<>();

        boolean isUrl = checkUrl(keyword);

        if (isUrl) {
            youtubeService.urlSearch(userId, keyword, danceDetailDtoList);
        } else {
            youtubeService.keywordSearch(userId, keyword, pageToken, size, danceDetailDtoList);
        }

        // 검색 결과 중 DB에 있는 챌린지 중 참여자 수 많은 상위 2개 조회
        List<DanceDetailsDto> dbDanceDetailDtoList = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            if (danceDetailDtoList.size() < 1 || danceDetailDtoList.get(0).getId() == null) {
                break;
            }
            dbDanceDetailDtoList.add(danceDetailDtoList.remove(0));
        }

        return DanceSearchDto.builder()
            .isUrl(isUrl)
            .search(danceDetailDtoList)
            .dbSearch(dbDanceDetailDtoList)
            .build();
    }

    private static boolean checkUrl(String keyword) {
        String[] checkList = {
            "https://", "http://", "youtube.com", "youtu.be"
        };
        for (String check : checkList) {
            if (keyword.contains(check)) {
                return true;
            }
        }
        return false;
    }

    @Transactional
    public AddDanceResponseDto addDance(Long userId, String youtubeId) throws IOException {
        String url = GOOGLE_YOUTUBE_URL + youtubeId;

        Dance dance = danceRepository.findByUrl(url).orElse(null);

        if (dance == null) { //처음인경우
            DanceDetailsDto danceDetailDto = youtubeService.getVideoDetail(userId, youtubeId);

            Dance newDance = Dance.builder()
                .danceDetailDto(danceDetailDto)
                .build();

            dance = danceRepository.save(newDance);
        }
        return AddDanceResponseDto.builder()
            .danceId(dance.getId())
            .build();
    }

    @Transactional
    public void saveResult(Long danceId, MultipartFile jsonFile) throws IOException {
        // JSON파일 서버에 저장
        String jsonPath = fileService.fileUpload("coordinate", jsonFile);
        log.info("변경 된 jsonPath : " + jsonPath);
        // DB에 파일 위치 UPDATE
        Dance dance = danceRepository.findById(danceId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 Dance id값 입니다."));
        dance.updateJsonPath(jsonPath);
        dance.changeStatus(2); //분석 완료 상태로 변경
    }

    @Transactional
    public DanceDetailsWithRankDto findDance(Long userId, Long danceId) throws IOException {
        Dance dance = danceRepository.findById(danceId)
            .orElseThrow(() -> new IllegalArgumentException("DB에 없는 Dance Id 입니다!!"));

        String youtubeId = dance.getYoutubeId();
        String url = GOOGLE_YOUTUBE_URL + youtubeId;

        // 1. 검색하기 (유튜브API 통해 자세한 동영상 정보 가져오기)
        DanceDetailsDto danceDetailDto = youtubeService.getVideoDetail(userId, youtubeId);
        log.info("1차 검색 정보 : " + danceDetailDto);

        // 2. 저장하기 (처음 참여한 경우에만)
        dance = danceRepository.findByUrl(url).orElse(null);

        List<DanceRankUserDto> danceRankUserDtoList = new ArrayList<>();

        if (dance == null) { //처음인경우
            //3. DB에 저장
            Dance newDance = Dance.builder()
                .danceDetailDto(danceDetailDto)
                .build();
            danceRepository.save(newDance);
            danceDetailDto.setId(newDance.getId());

        } else { //처음이 아닌 경우
            // 3. 상위 순위 유저 3명 (처음인 경우에는 순위가 0임)
            List<Tuple> myDanceList = myDanceRepository.findRankingUser(dance);

            for(Tuple tuple : myDanceList) {
                User user = tuple.get(0, User.class);
                int maxScore = tuple.get(1, Integer.class);

                List<MyDance> myDance = myDanceRepository.findByScoreAndUser(maxScore, user);
                if(myDance == null){
                    throw new IllegalArgumentException("잘못된 유저와 점수 입니다.");
                }
                DanceRankUserDto danceRankUserDto = DanceRankUserDto.builder()
                    .myDance(myDance.get(0))
                    .build();
                danceRankUserDtoList.add(danceRankUserDto);
            }

            // 찜한 첼린지 인지 체크하기
            if (bookmarkRepository.findBookmarkByUserIdAndDanceId(userId, dance.getId())
                .isPresent()) {
                danceDetailDto.setBookmark(true);
            }
        }

        return DanceDetailsWithRankDto.builder()
            .danceDetailDto(danceDetailDto)
            .danceRankUserDtoList(danceRankUserDtoList)
            .build();
    }

    public List<PopularDanceDto> findPopularDance() {
        List<Dance> danceList = danceRepository.findPopularDance();
        // List<Dance> -> List<PopularDance>
        return danceList.stream()
            .map(PopularDanceDto::new)
            .collect(Collectors.toList());
    }

    @Transactional
    public DanceStatusDto checkDanceStatus(Long danceId)
        throws YoutubeDLException, UnknownHostException {
        Dance dance = danceRepository.findById(danceId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 Dance id값 입니다."));
        int status = dance.getStatus();
        DanceStatusDto danceStatusDto = null;
        if (status == 0) { // 분석 안된 상태
            log.info("아직 분석 안 된 영상!!");
            dance.changeStatus(1);
            // 동영상 다운로드
            String url = dance.getUrl();

            String videopath = youtubeDownload(url);
            dance.saveVideoPath(videopath);

            danceStatusDto = DanceStatusDto.builder()
                .status(0)
                .videoPath(videopath)
                .build();

        } else if (status == 1) { // 분석 중인 상태
            log.info("분석 중 인 영상!!");
            danceStatusDto = DanceStatusDto.builder()
                .videoPath(dance.getVideoPath())
                .status(1)
                .build();
        } else { // 분석 완료인 상태
            log.info("이미 분석 완료 된 영상!!");
            danceStatusDto = DanceStatusDto.builder()
                .status(2)
                .videoPath(dance.getVideoPath())
                .jsonPath(dance.getJsonPath())
                .build();
        }
        return danceStatusDto;
    }

    public String youtubeDownload(String url) throws YoutubeDLException, UnknownHostException {
        String hostname = InetAddress.getLocalHost().getHostName();
        String path = "";
        File file = null;

        String youtubeId = url.split("/")[4];

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:/choom/youtube/";
        } else {
            path = "/var/lib/choom/youtube/";
        }
        file = new File(path + youtubeId);

        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        // Build request
        YoutubeDLRequest request = new YoutubeDLRequest(url, path);
        request.setOption("ignore-errors");        // --ignore-errors
        request.setOption("output", "%(id)s.mp4");    // --output "%(id)s"
        request.setOption("retries", 10);        // --retries 10

        YoutubeDL.setExecutablePath(path + "youtube-dl");

        // Make request and return response
        YoutubeDLResponse response = YoutubeDL.execute(request);

        return "/choom/youtube/" + youtubeId + ".mp4";
    }
}