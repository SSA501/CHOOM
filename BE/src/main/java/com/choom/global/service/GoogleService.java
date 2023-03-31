package com.choom.global.service;

import com.choom.domain.user.dto.SocialUserInfoDto;
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
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Slf4j
public class GoogleService {

    private static String GOOGLE_CLIENT_ID;
    private static String GOOGLE_CLIENT_SECRET;
    private static String GOOGLE_REDIRECT_URI;
    private static String UPLOAD_REDIRECT_URI;

    @Value("${google.client-id}")
    public void setGoogleClientId(String value) {
        GOOGLE_CLIENT_ID = value;
    }

    @Value("${google.client-secret}")
    public void setGoogleClientSecret(String value) {
        GOOGLE_CLIENT_SECRET = value;
    }

    @Value("${redirect-uri.google}")
    public void setGoogleRedirectUri(String value) {
        GOOGLE_REDIRECT_URI = value;
    }

    @Value("${redirect-uri.upload}")
    public void setUploadRedirectUri(String value) {
        UPLOAD_REDIRECT_URI = value;
    }

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    private static final JsonFactory JSON_FACTORY = new JacksonFactory();

    private static YouTube youtube;

    private static String VIDEO_FILE_FORMAT = "video/*";

    public SocialUserInfoDto getUserInfo(String code) {
        String accessToken = getAccessToken("LOGIN", code);
        log.info("구글 accessToken : " + accessToken);
        return getUserInfoByToken(accessToken);
    }

    public String getAccessToken(String type, String code) {
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
            sb.append("&client_id=" + GOOGLE_CLIENT_ID);
            sb.append("&client_secret=" + GOOGLE_CLIENT_SECRET);
            if (type.equals("LOGIN")) {
                sb.append("&redirect_uri=" + GOOGLE_REDIRECT_URI);
            } else {
                sb.append("&redirect_uri=" + UPLOAD_REDIRECT_URI);
            }
            sb.append("&grant_type=" + "authorization_code");
            log.info(sb.toString());
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

        return access_Token;
    }

    private SocialUserInfoDto getUserInfoByToken(String accessToken) {

        String reqURL = "https://www.googleapis.com/oauth2/v2/userinfo";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.info("response body : " + result);

            //Gson 라이브러리로 JSON 파싱
            JsonParser jsonParser = new JsonParser();
            JsonElement jsonElement = jsonParser.parse(result);
            JsonObject jsonObject = jsonElement.getAsJsonObject();

            String identifier = jsonObject.get("id").getAsString();
            String nickname = jsonObject.get("given_name").getAsString();
            String profileImage = jsonObject.get("picture").getAsString();

            log.info("identifier : " + identifier);

            br.close();

            return new SocialUserInfoDto(identifier, nickname, profileImage);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Credential getCredential(String accessToken) {
        return new GoogleCredential.Builder()
                .setTransport(HTTP_TRANSPORT)
                .setJsonFactory(JSON_FACTORY)
                .setClientSecrets(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
                .build()
                .setAccessToken(accessToken);
    }

    public YouTube getYoutubeObject(Credential credential) {
        return new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName(
                "Choom").build();
    }

    public String youtubeInsert(Credential credential, File videoFile, String title) throws IOException {
        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName(
                "Choom").build();

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
    }
}