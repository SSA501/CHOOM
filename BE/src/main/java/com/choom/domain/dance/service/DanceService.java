package com.choom.domain.dance.service;

import com.choom.domain.dance.dto.DanceDetailsWithRankDto;
import com.choom.domain.dance.dto.DanceDetailsDto;
import com.choom.domain.dance.dto.DancePopularDto;
import com.choom.domain.dance.dto.DanceRankUserDto;
import com.choom.domain.dance.entity.Dance;
import com.choom.domain.dance.entity.DanceRepository;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.global.service.FileService;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Video;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.google.api.services.youtube.YouTube;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class DanceService {

    private final DanceRepository danceRepository;
    private final MyDanceRepository myDanceRepository;
    private final FileService fileService;

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    private static final long NUMBER_OF_VIDEOS_RETURNED = 30;  // 검색 개수
    private static YouTube youtube;

    private static final String GOOGLE_YOUTUBE_URL =  "https://www.youtube.com/shorts/";
    private static final String YOUTUBE_SEARCH_FIELDS1 = "items(id/videoId,snippet/title,snippet/channelTitle)";
    private static final String YOUTUBE_SEARCH_FIELDS2 = "items(contentDetails/duration,snippet/title, snippet/description,snippet/publishedAt, snippet/thumbnails/high/url,statistics/likeCount,statistics/viewCount)";

    private static String YOUTUBE_APIKEY;
    @Value("${apikey.youtube}")
    public void setKey(String value){
        YOUTUBE_APIKEY = value;
    }

    static {
        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
            public void initialize(HttpRequest request) throws IOException {
            }
        }).setApplicationName("youtube-cmdline-search-sample").build();
    }

    public List<DanceDetailsDto> searchDance(String keyword) {
        log.info("Starting YouTube search... " +keyword);
        List<DanceDetailsDto> danceDetailDtoList = new ArrayList<>();

        try {

            // 1. 유튜브 검색 결과
            if (youtube != null) {
                YouTube.Search.List search = youtube.search().list("snippet");
                search.setKey(YOUTUBE_APIKEY);
                search.setQ(keyword);
                search.setType("video");
                search.setVideoDuration("short");
                search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);
                search.setFields(YOUTUBE_SEARCH_FIELDS1);

                SearchListResponse searchResponse = search.execute();
                List<SearchResult> searchResultList = searchResponse.getItems();

                if (searchResultList != null) {
                    for (SearchResult video : searchResultList) {
                        // 비동기로 검색 -> 검색 속도 향상
                        String videoId = video.getId().getVideoId();
                        DanceDetailsDto danceDetailDto = getVideoDetail(videoId);

                        if (danceDetailDto != null)
                            danceDetailDtoList.add(danceDetailDto);
                    }
                }
            }

            // 2. 틱톡 검색 결과

        } catch (GoogleJsonResponseException e){
            log.info("There was a service error: " + e.getDetails().getCode() + " : "  + e.getDetails().getMessage());
        } catch(IOException e){
            log.info("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch(Throwable t){
            t.printStackTrace();
        }

        Collections.sort(danceDetailDtoList, (o1, o2) -> { //new Comparator<YoutubeResponseDto>() -> lambda
            // 챌린지 참여자 수 -> 원본 영상 시청자 순 으로 정렬
            if(o1.getUserCount() == o2.getUserCount()){
                return (int)(o2.getViewCount()- o1.getViewCount());
            }else{
                return o2.getUserCount() - o1.getUserCount();
            }
        });
        return danceDetailDtoList;
    }

    @Async
    DanceDetailsDto getVideoDetail(String videoId)throws IOException {
        YouTube.Videos.List videoDetails =  youtube.videos().list("contentDetails");
        videoDetails.setKey(YOUTUBE_APIKEY);
        videoDetails.setId(videoId);
        videoDetails.setPart("statistics,snippet,contentDetails");
        videoDetails.setFields(YOUTUBE_SEARCH_FIELDS2);

        if(videoDetails.execute().getItems().size() == 0){
            throw new IllegalArgumentException("유튜브 동영상 id가 올바르지 않습니다...");
        }
        Video videoDetail = videoDetails.execute().getItems().get(0);

        log.info("결과 : videoDetail : "+videoDetail.toString());
        //1분 이내 영상인지 확인
        String time = videoDetail.getContentDetails().getDuration();
        if(time.equals("P0D") || time.contains("M")){ // P0D는 라이브 방송
            return null;
        }

        Long likeCount = 0L;
        if(videoDetail.getStatistics().getLikeCount()!=null){
            likeCount = videoDetail.getStatistics().getLikeCount().longValue();
        }
        Long viewCount = 0L;
        if(videoDetail.getStatistics().getViewCount()!=null){
            viewCount = videoDetail.getStatistics().getViewCount().longValue();
        }

        String url = GOOGLE_YOUTUBE_URL + videoId;
        Dance dance = danceRepository.findByUrl(url).orElse(null);

        int userCount = 0;
        int status = 0;
        if(dance != null){
            userCount = dance.getUserCount();
            status = dance.getStatus();
        }
        String publishedAt = String.valueOf(videoDetail.getSnippet().getPublishedAt()).split("T")[0];
        //1분 이내인 경우
        int s = Integer.parseInt(time.split("T")[1].split("S")[0]);
        DanceDetailsDto danceDetailDto = DanceDetailsDto.builder()
            .url(url)
            .title(videoDetail.getSnippet().getTitle())
            .description(videoDetail.getSnippet().getDescription())
            .thumbnailPath(videoDetail.getSnippet().getThumbnails().getHigh().getUrl())
            .sec(s)
            .likeCount(likeCount)
            .viewCount(viewCount)
            .userCount(userCount)
            .videoId(videoId)
            .status(status)
            .publishedAt(publishedAt)
            .build();
        return danceDetailDto;
    }

    public void addCoordinate(Long danceId, MultipartFile jsonFile) throws IOException {
        // JSON파일 서버에 저장
        String jsonPath = fileService.fileUpload("coordinate", jsonFile);
        log.info("변경 된 jsonPath : "+jsonPath);
        // DB에 파일 위치 UPDATE
        Dance dance = danceRepository.findById(danceId).orElse(null);
        if(dance != null){
            dance.updateJsonPath(jsonPath);
        }
    }

    @Transactional
    public DanceDetailsWithRankDto findDance(String videoId) throws IOException {
        String url = GOOGLE_YOUTUBE_URL+videoId;

        // 1. 검색하기 (유튜브API 통해 자세한 동영상 정보 가져오기)
        DanceDetailsDto danceDetailDto = getVideoDetail(videoId);
        log.info("1차 검색 정보 : " + danceDetailDto);

        // 2. 저장하기 (처음 참여한 경우에만)
        Dance dance = danceRepository.findByUrl(url).orElse(null);

        List<DanceRankUserDto> danceRankUserDtoList = new ArrayList<>();

        if(dance == null){ //처음인경우
            //3. DB에 저장
            Dance insertDance = Dance.builder()
                .danceDetailDto(danceDetailDto)
                .build();
            danceRepository.save(insertDance);

        }else{ //처음이 아닌 경우
            // 3. 상위 순위 유저 3명 (처음인 경우에는 순위가 0임)
            List<MyDance> myDanceList = myDanceRepository.findRankingUser(dance);
            danceRankUserDtoList = myDanceList.stream().map(myDance ->
                DanceRankUserDto.builder()
                    .title(myDance.getTitle())
                    .videoLength(myDance.getVideoLength())
                    .userId(myDance.getUser().getId())
                    .nickname(myDance.getUser().getNickname())
                    .score(myDance.getScore())
                    .youtubeUrl(myDance.getYoutubeUrl())
                    .tiktokUrl(myDance.getTiktokUrl())
                    .build()
            ).collect(
                Collectors.toList());
        }

        DanceDetailsWithRankDto danceDetailWithRankDto = DanceDetailsWithRankDto.builder()
            .danceDetailDto(danceDetailDto)
            .danceRankUserDtoList(danceRankUserDtoList)
            .build();

        return danceDetailWithRankDto;
    }

    public List<DancePopularDto> findPopularDance() {
        List<Dance> danceList = danceRepository.findPopularDance();
        List<DancePopularDto> dancePopularDtoList = danceList.stream().map(DancePopularDto::new).collect(
            Collectors.toList());
        return dancePopularDtoList;

    }
}