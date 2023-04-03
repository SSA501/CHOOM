package com.choom.global.service;

import com.choom.domain.user.dto.SocialUserInfoDto;
import com.choom.global.model.SocialAccessTokenResponse;
import com.choom.global.model.GoogleUserInfoResponse;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleService {

    private final GoogleAccessTokenService googleAccessTokenService;
    private final GoogleUserInfoService googleUserInfoService;

    @Value("${google.client-id}")
    private String GOOGLE_CLIENT_ID;

    @Value("${google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;

    @Value("${redirect-uri.google}")
    private String GOOGLE_REDIRECT_URI;

    @Value("${redirect-uri.upload}")
    private String UPLOAD_REDIRECT_URI;

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    private static final JsonFactory JSON_FACTORY = new JacksonFactory();

    private static YouTube youtube;

    private static String VIDEO_FILE_FORMAT = "video/*";

    public SocialUserInfoDto getUserInfo(String code) {
        String accessToken = getAccessToken("LOGIN", code);
        log.info("구글 accessToken : " + accessToken);
        GoogleUserInfoResponse googleUserInfoResponse = googleUserInfoService.getUserInfo("Bearer " + accessToken);
        return SocialUserInfoDto.builder()
                .googleUserInfoResponse(googleUserInfoResponse)
                .build();
    }

    public String getAccessToken(String type, String code) {
        SocialAccessTokenResponse googleAccessTokenResponse = null;
        if (type.equals("LOGIN")) {
            googleAccessTokenResponse = googleAccessTokenService.getAccessToken(code, GOOGLE_CLIENT_ID,
                    GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, "authorization_code");
        } else {
            googleAccessTokenResponse = googleAccessTokenService.getAccessToken(code, GOOGLE_CLIENT_ID,
                    GOOGLE_CLIENT_SECRET, UPLOAD_REDIRECT_URI, "authorization_code");
        }
        log.info(String.valueOf(googleAccessTokenResponse));
        return googleAccessTokenResponse.getAccess_token();
    }

    public Credential getCredential(String accessToken) {
        return new GoogleCredential.Builder()
                .setTransport(HTTP_TRANSPORT)
                .setJsonFactory(JSON_FACTORY)
                .setClientSecrets(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
                .build()
                .setAccessToken(accessToken);
    }

    public String youtubeInsert(Credential credential, File videoFile, String title) throws IOException {
        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName(
                "Choom").build();

        Video videoObjectDefiningMetadata = new Video();

        VideoStatus status = new VideoStatus();
        status.setPrivacyStatus("public");
        videoObjectDefiningMetadata.setStatus(status);

        VideoSnippet snippet = new VideoSnippet();

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

        MediaHttpUploader uploader = videoInsert.getMediaHttpUploader();

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

        Video returnedVideo = videoInsert.execute();

        log.info("================== Returned Video ==================");
        log.info("  - Id: " + returnedVideo.getId());
        log.info("  - Title: " + returnedVideo.getSnippet().getTitle());
        log.info("  - Tags: " + returnedVideo.getSnippet().getTags());
        log.info("  - Privacy Status: " + returnedVideo.getStatus().getPrivacyStatus());
        log.info("  - Video Count: " + returnedVideo.getStatistics().getViewCount());

        return returnedVideo.getId();
    }
}