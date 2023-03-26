package com.choom.domain.mydance.service;

import com.choom.domain.mydance.dto.AddMyDanceRequestDto;
import com.choom.domain.mydance.dto.AddMyDanceResponseDto;
import com.choom.domain.mydance.dto.AddShortsResponseDto;
import com.choom.domain.mydance.dto.FindMyDanceResponseDto;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.originaldance.entity.OriginalDance;
import com.choom.domain.originaldance.entity.OriginalDanceRepository;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.service.FileService;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.googleapis.media.MediaHttpUploader;
import com.google.api.client.googleapis.media.MediaHttpUploaderProgressListener;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;
import com.google.common.collect.Lists;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
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
import java.util.*;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class MyDanceService {

    private final FileService fileService;
    private final UserRepository userRepository;
    private final MyDanceRepository myDanceRepository;
    private final OriginalDanceRepository originalDanceRepository;

    /** Global instance of the HTTP transport. */
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    /** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();

    /** Global instance of Youtube object to make all API requests. */
    private static YouTube youtube;

    /* Global instance of the format used for the video being uploaded (MIME type). */
    private static String VIDEO_FILE_FORMAT = "video/*";

    /**
     * Authorizes the installed application to access user's protected data.
     *
     * @param scopes list of scopes needed to run youtube upload.
     */
    private static Credential authorize(List<String> scopes) throws Exception {

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

        // Set up authorization code flow.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, clientSecrets, scopes)
                .setDataStoreFactory(new FileDataStoreFactory(new File("CREDENTIALS")))
                .setAccessType("offline")
                .build();

        // Build the local server and bind it to port 9000
        LocalServerReceiver localReceiver = new LocalServerReceiver.Builder().setPort(9000).build();

        // Authorize.
        return new AuthorizationCodeInstalledApp(flow, localReceiver).authorize("user");
    }

    @Transactional
    public AddMyDanceResponseDto addMyDance(AddMyDanceRequestDto myDanceAddRequestDto, MultipartFile videoFile) throws IOException {
        // 내 챌린지 영상 업로드
        String videoPath = fileService.fileUpload("mydance", videoFile);

        // MY_DANCE insert
        // user 더미데이터
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        OriginalDance originalDance = originalDanceRepository.findById(myDanceAddRequestDto.getOriginalDanceId())
                .orElseThrow(() -> new IllegalArgumentException("챌린지를 찾을 수 없습니다"));
        MyDance myDance = MyDance.builder()
                .score(myDanceAddRequestDto.getScore())
                .matchRate(myDanceAddRequestDto.getMatchRate())
                .videoLength(myDanceAddRequestDto.getVideoLength())
                .title(myDanceAddRequestDto.getTitle())
                .videoPath(videoPath)
                .user(user)
                .originalDance(originalDance)
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
    public void removeMyDance(Long myDanceId) {
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
    public AddShortsResponseDto addShorts(Long myDanceId) {
        MyDance myDance = myDanceRepository.findById(myDanceId)
                .orElseThrow(() -> new IllegalArgumentException("내 챌린지를 찾을 수 없습니다"));

        String videoId = uploadVideo(myDance.getVideoPath(), myDance.getTitle());
        String youtubeUrl = "https://youtube.com/shorts/"+videoId;

        myDance.updateYoutubeUrl(youtubeUrl);

        return AddShortsResponseDto.builder()
                .youtubeUrl(youtubeUrl)
                .build();
    }

    private String uploadVideo(String videoPath, String title) {
        // Scope required to upload to YouTube.
        List<String> scopes = Lists.newArrayList("https://www.googleapis.com/auth/youtube.upload");

        try {
            // Authorization.
            Credential credential = authorize(scopes);

            // 인증 정보를 파일로 저장합니다.
            saveCredentialsToFile(credential);

            // YouTube object used to make all API requests.
            youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName(
                    "Choom").build();

            // We get the user selected local video file to upload.
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

    // 일치율 계산 부분 (front에서 하기로 해서 안 씀!)
    private HashMap<String, Object> calculate(Long originalDanceId, String myDanceCoordinatePath) throws IOException {
        HashMap<String, Object> result = new HashMap<>();
        ArrayList<Double> matchRates = new ArrayList<Double>();
        double similaritySum = 0.0;

        /*
        coordinate에서 result를 가져오는 code
        String originalDanceJsonFile = originalDanceService.findById(originalDanceId);
         */

        // 현재는 그냥 더미 데이터로 테스트
        Reader originalDanceCoordinate = new FileReader("C:\\Users\\SSAFY\\Downloads\\jsonexample.json");
        Reader myDanceCoordinate = new FileReader(myDanceCoordinatePath);

        JsonParser parser = new JsonParser();
        JsonArray originalResult = parser.parse(originalDanceCoordinate).getAsJsonArray();
        JsonArray myResult = parser.parse(myDanceCoordinate).getAsJsonArray();

        // JsonArray에서 하나씩 처리
        if (myResult.size() > 0) {
            // 내 챌린지 영상 frame 개수만큼 반복
            // 원본 영상보다 내 챌린지 영상이 긴 경우는 없다고 가정
            for (int i = 0; i < myResult.size(); i++) {
                // keypoints 배열
                JsonArray originalKeypoints = originalResult.get(i).getAsJsonObject().get("keypoints").getAsJsonArray();
                JsonArray myKeypoints = myResult.get(i).getAsJsonObject().get("keypoints").getAsJsonArray();

                double similarity = calculate(originalKeypoints, myKeypoints);

                similaritySum += similarity;
                matchRates.add(similarity);

            }
        }

        // mycoordinate 파일 삭제
        myDanceCoordinate.close();
        fileService.fileDelete(myDanceCoordinatePath);

        result.put("matchRate", matchRates.toString());
        result.put("score", (int) similaritySum / myResult.size());
        return result;
    }

    private double calculate(JsonArray originalKeypoints, JsonArray myKeypoints) {
        // 관절 벡터 배열
        int[][] joints = {
                {8, 12},
                {7, 11},
                {8, 7},
                {12, 14},
                {16, 14},
                {16, 20},
                {16, 18},
                {11, 13},
                {13, 15},
                {15, 19},
                {15, 17},
                {12, 11},
                {12, 24},
                {11, 23},
                {24, 23},
                {24, 26},
                {26, 28},
                {28, 32},
                {28, 30},
                {23, 25},
                {25, 27},
                {27, 29},
                {27, 31},
        };

        double sum = 0;
        double accuracySum = 0;

        for (int[] joint : joints) {
            JsonObject originalKeypoint1 = originalKeypoints.get(joint[0]).getAsJsonObject();
            JsonObject originalKeypoint2 = originalKeypoints.get(joint[1]).getAsJsonObject();

            JsonObject myKeypoint1 = myKeypoints.get(joint[0]).getAsJsonObject();
            JsonObject myKeypoint2 = myKeypoints.get(joint[1]).getAsJsonObject();

            Map<String, Double> originalVector = Map.of(
                    "x", originalKeypoint1.get("x").getAsDouble() - originalKeypoint2.get("x").getAsDouble(),
                    "y", originalKeypoint1.get("y").getAsDouble() - originalKeypoint2.get("y").getAsDouble(),
                    "z", originalKeypoint1.get("z").getAsDouble() - originalKeypoint2.get("z").getAsDouble()
            );

            Map<String, Double> myVector = Map.of(
                    "x", myKeypoint1.get("x").getAsDouble() - myKeypoint2.get("x").getAsDouble(),
                    "y", myKeypoint1.get("y").getAsDouble() - myKeypoint2.get("y").getAsDouble(),
                    "z", myKeypoint1.get("z").getAsDouble() - myKeypoint2.get("z").getAsDouble()
            );

            double accuracy = (originalKeypoint1.get("score").getAsDouble() + originalKeypoint2.get("score").getAsDouble()) / 2;

            accuracySum += accuracy;

            // 벡터 정규화
            Map<String, Double> originalNorm = normalization(originalVector);
            Map<String, Double> myNorm = normalization(myVector);

            // 코사인 유사도 계산
            double result = cosineSimilarity(originalNorm, myNorm) * accuracy;
            sum += result;

        }

        double avg = sum / accuracySum;
        if (avg < 0)
            return 0;
        else
            return Math.round(avg * 100);
    }

    private double cosineSimilarity(Map<String, Double> originalNorm, Map<String, Double> myNorm) {
        if (originalNorm == null || myNorm == null) {
            throw new IllegalArgumentException("Vectors must not be null");
        }

        final Set<String> intersection = getIntersection(originalNorm, myNorm);

        final double dotProduct = dot(originalNorm, myNorm, intersection);

        double d1 = 0.0d;
        for (final Double value : originalNorm.values()) {
            d1 += Math.pow(value, 2);
        }
        double d2 = 0.0d;
        for (final Double value : myNorm.values()) {
            d2 += Math.pow(value, 2);
        }
        double cosineSimilarity;
        if (d1 <= 0.0 || d2 <= 0.0) {
            cosineSimilarity = 0.0;
        } else {
            cosineSimilarity = (double) (dotProduct / (double) (Math.sqrt(d1) * Math.sqrt(d2)));
        }
        return cosineSimilarity;
    }

    private Set<String> getIntersection(Map<String, Double> originalNorm, Map<String, Double> myNorm) {
        final Set<String> intersection = new HashSet<>(originalNorm.keySet());
        intersection.retainAll(myNorm.keySet());
        return intersection;
    }

    private double dot(Map<String, Double> originalNorm, Map<String, Double> myNorm, Set<String> intersection) {
        double dotProduct = 0;
        for (final String key : intersection) {
            dotProduct += originalNorm.get(key) * myNorm.get(key);
        }
        return dotProduct;
    }

    private Map<String, Double> normalization(Map<String, Double> vector) {
        double norm = Math.sqrt(vector.get("x") * vector.get("x") + vector.get("y") * vector.get("y") + vector.get("z") * vector.get("z"));
        return Map.of(
                "x", vector.get("x") / norm,
                "y", vector.get("y") / norm,
                "z", vector.get("z") / norm
        );
    }
}
