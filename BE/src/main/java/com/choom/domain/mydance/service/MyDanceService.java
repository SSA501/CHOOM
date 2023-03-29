package com.choom.domain.mydance.service;

import com.choom.domain.dance.entity.Dance;
import com.choom.domain.mydance.dto.*;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.dance.entity.DanceRepository;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.service.FileService;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.googleapis.media.MediaHttpUploader;
import com.google.api.client.googleapis.media.MediaHttpUploaderProgressListener;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
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
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.*;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class MyDanceService {

    private final FileService fileService;
    private final UserRepository userRepository;
    private final MyDanceRepository myDanceRepository;
    private final DanceRepository danceRepository;

    /** Global instance of the HTTP transport. */
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    /** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();

    /** Global instance of Youtube object to make all API requests. */
    private static YouTube youtube;

    /* Global instance of the format used for the video being uploaded (MIME type). */
    private static String VIDEO_FILE_FORMAT = "video/*";

    private static Credential authorize(String code) throws Exception {

        // Load client secrets.
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(
                JSON_FACTORY, new InputStreamReader(Objects.requireNonNull(MyDanceService.class.getResourceAsStream("/client_secrets.json"))));

        // Checks that the defaults have been replaced (Default = "Enter X here").
        if (clientSecrets.getDetails().getClientId().startsWith("Enter")
                || clientSecrets.getDetails().getClientSecret().startsWith("Enter ")) {
            log.info(
                    "Enter Client ID and Secret from https://console.developers.google.com/project/_/apiui/credential"
                            + "into youtube-cmdline-uploadvideo-sample/src/main/resources/client_secrets.json");
            System.exit(1);
        }

        log.info("GOOGLE_CLIENT_ID : "+clientSecrets.getDetails().getClientId());
        log.info("GOOGLE_SECRET : "+clientSecrets.getDetails().getClientSecret());

        String access_Token="";
        String reqURL = "https://oauth2.googleapis.com/token";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("&code=" + code);
            sb.append("&client_id=" + clientSecrets.getDetails().getClientId());
            sb.append("&client_secret=" + clientSecrets.getDetails().getClientSecret());
            sb.append("&redirect_uri=" + "https://j8a501.p.ssafy.io/login/oauth2/google");
            sb.append("&grant_type=" + "authorization_code");
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();

            br.close();
            bw.close();
        }catch (IOException e) {
            e.printStackTrace();
        }

        return new GoogleCredential.Builder()
                .setTransport(HTTP_TRANSPORT)
                .setJsonFactory(JSON_FACTORY)
                .setClientSecrets(clientSecrets)
                .build()
                .setAccessToken(access_Token);
    }

    @Transactional
    public AddMyDanceResponseDto addMyDance(AddMyDanceRequestDto myDanceAddRequestDto, MultipartFile videoFile) throws IOException {
        // 내 챌린지 영상 업로드
        String videoPath = fileService.fileUpload("mydance", videoFile);

        // MY_DANCE insert
        // user 더미데이터
        User user = userRepository.findById(1L)
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

    public Resource downloadMyDance(Long myDanceId, HttpHeaders headers) throws IOException {
        // 내 챌린지 영상 경로 찾기
        String videoPath = myDanceRepository.findById(myDanceId).get().getVideoPath();
        log.info(videoPath);

        // file -> Resource
        Resource resource = fileService.fileDownload(videoPath, headers);

        return resource;
    }

    @Transactional
    public void removeMyDance(Long myDanceId) throws UnknownHostException {
        MyDance myDance = myDanceRepository.findById(myDanceId)
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

    public Page<FindMyDanceResponseDto> findAllMyDance(Pageable pageable) {
        // user 더미데이터
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Page<MyDance> myDancePage = myDanceRepository.findPageByUser(user, pageable);

        // MyDance -> FindMyDanceResponseDto
        return myDancePage.map(myDance -> FindMyDanceResponseDto.builder()
                .myDance(myDance)
                .build());
    }

    @Transactional
    public FindMyDanceResponseDto modifyTitle(Long myDanceId, ModifyMyDanceRequestDto modifyMyDanceRequestDto) {
        MyDance myDance = myDanceRepository.findById(myDanceId)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));

        myDance.updateTitle(modifyMyDanceRequestDto.getTitle());

        return FindMyDanceResponseDto.builder()
                .myDance(myDance)
                .build();
    }

    @Transactional
    public AddShortsResponseDto addShorts(Long myDanceId, String code) {
        MyDance myDance = myDanceRepository.findById(myDanceId)
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
            Credential credential = authorize(code);
            log.info("token : " + credential.getAccessToken());

            // 인증 정보를 파일로 저장합니다.
            saveCredentialsToFile(credential);

            // YouTube object used to make all API requests.
            youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName(
                    "Choom").build();

            // We get the user selected local video file to upload.
            String hostname = InetAddress.getLocalHost().getHostName();
            if (hostname.substring(0, 7).equals("DESKTOP")) {
                videoPath = "C:" + videoPath;
            } else {
                videoPath = "/var/lib" + videoPath;
            }
            File videoFile = new File(videoPath);
            log.info("You chose " + videoFile + " to upload.");

            // Add extra information to the video before uploading.
            Video videoObjectDefiningMetadata = new Video();

            /*
             * Set the video to public, so it is available to everyone (what most people want). This is
             * actually the default, but I wanted you to see what it looked like in case you need to set
             * it to "unlisted" or "private" via API.
             */
            VideoStatus status = new VideoStatus();
            status.setPrivacyStatus("public");
            videoObjectDefiningMetadata.setStatus(status);

            // We set a majority of the metadata with the VideoSnippet object.
            VideoSnippet snippet = new VideoSnippet();

            /*
             * The Calendar instance is used to create a unique name and description for test purposes, so
             * you can see multiple files being uploaded. You will want to remove this from your project
             * and use your own standard names.
             */
            snippet.setTitle("C#OOM - " + title);
            // 제목, 설명, 태그를 request로 받을까??
//            snippet.setDescription(
//                    "Video uploaded via YouTube Data API V3 using the Java library " + "on " + cal.getTime());
//
//            // Set your keywords.
//            List<String> tags = new ArrayList<String>();
//            tags.add("test");
//            tags.add("example");
//            tags.add("java");
//            tags.add("YouTube Data API V3");
//            tags.add("erase me");
//            snippet.setTags(tags);

            // Set completed snippet to the video object.
            videoObjectDefiningMetadata.setSnippet(snippet);

            InputStreamContent mediaContent = new InputStreamContent(
                    VIDEO_FILE_FORMAT, new BufferedInputStream(new FileInputStream(videoFile)));
            mediaContent.setLength(videoFile.length());

            /*
             * The upload command includes: 1. Information we want returned after file is successfully
             * uploaded. 2. Metadata we want associated with the uploaded video. 3. Video file itself.
             */
            YouTube.Videos.Insert videoInsert = youtube.videos()
                    .insert("snippet,statistics,status", videoObjectDefiningMetadata, mediaContent);

            // Set the upload type and add event listener.
            MediaHttpUploader uploader = videoInsert.getMediaHttpUploader();

            /*
             * Sets whether direct media upload is enabled or disabled. True = whole media content is
             * uploaded in a single request. False (default) = resumable media upload protocol to upload
             * in data chunks.
             */
            uploader.setDirectUploadEnabled(false);

            MediaHttpUploaderProgressListener progressListener = new MediaHttpUploaderProgressListener() {
                public void progressChanged(MediaHttpUploader uploader) throws IOException {
                    switch (uploader.getUploadState()) {
                        case INITIATION_STARTED:
                            log.info("Initiation Started");
                            break;
                        case INITIATION_COMPLETE:
                            log.info("Initiation Completed");
                            break;
                        case MEDIA_IN_PROGRESS:
                            log.info("Upload in progress");
                            log.info("Upload percentage: " + uploader.getProgress());
                            break;
                        case MEDIA_COMPLETE:
                            log.info("Upload Completed!");
                            break;
                        case NOT_STARTED:
                            log.info("Upload Not Started!");
                            break;
                    }
                }
            };
            uploader.setProgressListener(progressListener);

            // Execute upload.
            Video returnedVideo = videoInsert.execute();

            // Print out returned results.
            log.info("================== Returned Video ==================");
            log.info("  - Id: " + returnedVideo.getId());
            log.info("  - Title: " + returnedVideo.getSnippet().getTitle());
            log.info("  - Tags: " + returnedVideo.getSnippet().getTags());
            log.info("  - Privacy Status: " + returnedVideo.getStatus().getPrivacyStatus());
            log.info("  - Video Count: " + returnedVideo.getStatistics().getViewCount());

        return returnedVideo.getId();
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
