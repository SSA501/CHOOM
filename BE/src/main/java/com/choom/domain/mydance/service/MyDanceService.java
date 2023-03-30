package com.choom.domain.mydance.service;

import com.choom.domain.dance.entity.Dance;
import com.choom.domain.mydance.dto.*;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.dance.entity.DanceRepository;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.service.FileService;
import com.choom.global.service.GoogleService;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class MyDanceService {

    private final GoogleService googleService;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final MyDanceRepository myDanceRepository;
    private final DanceRepository danceRepository;

    @Transactional
    public AddMyDanceResponseDto addMyDance(Long userId, AddMyDanceRequestDto myDanceAddRequestDto, MultipartFile videoFile) throws IOException {
        // 내 챌린지 영상 업로드
        String videoPath = fileService.fileUpload("mydance", videoFile);

        // MY_DANCE insert
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        Dance dance = danceRepository.findById(myDanceAddRequestDto.getDanceId())
                .orElseThrow(() -> new IllegalArgumentException("챌린지를 찾을 수 없습니다"));
        MyDance myDance = MyDance.builder()
                .score(myDanceAddRequestDto.getScore())
                .matchRate(myDanceAddRequestDto.getMatchRate())
                .videoLength(myDanceAddRequestDto.getVideoLength())
                .title(myDanceAddRequestDto.getTitle())
                .videoPath(videoPath)
                .user(user)
                .dance(dance)
                .build();
        MyDance insertResult = myDanceRepository.save(myDance);

        return AddMyDanceResponseDto.builder()
                .myDance(insertResult)
                .build();

    }

    public Resource downloadMyDance(Long userId, Long myDanceId, HttpHeaders headers) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 내 챌린지 영상
        MyDance myDance = myDanceRepository.findByIdAndUser(myDanceId, user)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));

        // 내 챌린지 영상 경로 찾기
        String videoPath = myDance.getVideoPath();
        log.info(videoPath);

        // file -> Resource
        Resource resource = fileService.fileDownload(videoPath, headers);

        return resource;
    }

    @Transactional
    public void removeMyDance(Long userId, Long myDanceId) throws UnknownHostException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        MyDance myDance = myDanceRepository.findByIdAndUser(myDanceId, user)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));

        // 내 챌린지 영상 삭제
        fileService.fileDelete(myDance.getVideoPath());

        // MY_DANCE delete
        myDanceRepository.deleteById(myDanceId);
    }

    public FindMyDanceResponseDto findMyDance(Long myDanceId) {
        MyDance myDance = myDanceRepository.findById(myDanceId)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));
        return FindMyDanceResponseDto.builder()
                .myDance(myDance)
                .build();
    }

    public Page<FindMyDanceResponseDto> findAllMyDance(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Page<MyDance> myDancePage = myDanceRepository.findPageByUser(user, pageable);

        // MyDance -> FindMyDanceResponseDto
        return myDancePage.map(myDance -> FindMyDanceResponseDto.builder()
                .myDance(myDance)
                .build());
    }

    @Transactional
    public FindMyDanceResponseDto modifyTitle(Long userId, Long myDanceId, ModifyMyDanceRequestDto modifyMyDanceRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        MyDance myDance = myDanceRepository.findByIdAndUser(myDanceId, user)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));

        myDance.updateTitle(modifyMyDanceRequestDto.getTitle());

        return FindMyDanceResponseDto.builder()
                .myDance(myDance)
                .build();
    }

    @Transactional
    public AddShortsResponseDto addShorts(Long userId, Long myDanceId, String code) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        MyDance myDance = myDanceRepository.findByIdAndUser(myDanceId, user)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));

        String youtubeId = uploadVideo(myDance.getVideoPath(), myDance.getTitle(), code);
        String youtubeUrl = "https://youtube.com/shorts/"+youtubeId;

        myDance.updateYoutubeUrl(youtubeUrl);

        return AddShortsResponseDto.builder()
                .youtubeUrl(youtubeUrl)
                .build();
    }

    private String uploadVideo(String videoPath, String title, String code) {
        try {
            // Authorization.
            String accessToken = googleService.getAccessToken(code);
            Credential credential = googleService.getCredential(accessToken);
            log.info("token : " + credential.getAccessToken());

            // 인증 정보를 파일로 저장합니다.
            saveCredentialsToFile(credential);

            String hostname = InetAddress.getLocalHost().getHostName();
            if (hostname.substring(0, 7).equals("DESKTOP")) {
                videoPath = "C:" + videoPath;
            } else {
                videoPath = "/var/lib" + videoPath;
            }
            File videoFile = new File(videoPath);
            log.info("You chose " + videoFile + " to upload.");

            return googleService.youtubeInsert(credential, videoFile, title);

        } catch (GoogleJsonResponseException e) {
            log.info("GoogleJsonResponseException code: " + e.getDetails().getCode() + " : "
                    + e.getDetails().getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            log.info("IOException: " + e.getMessage());
            e.printStackTrace();
        } catch (Throwable t) {
            log.info("Throwable: " + t.getMessage());
            t.printStackTrace();
        }

        return null;
    }

    private static void saveCredentialsToFile(Credential credentials) throws IOException {
        try (FileOutputStream outputStream = new FileOutputStream(new File(System.getProperty("user.home"), ".credentials/youtube-api-uploadvideo.json"))) {
            OutputStreamWriter writer = new OutputStreamWriter(outputStream);
            writer.write(credentials.getAccessToken());
            writer.close();
        }
    }
}
