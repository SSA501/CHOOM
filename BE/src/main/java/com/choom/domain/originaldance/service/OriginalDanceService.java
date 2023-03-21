package com.choom.domain.originaldance.service;

import com.choom.domain.originaldance.dto.YoutubeResponseDto;
import com.choom.domain.originaldance.entity.OriginalDance;
import com.choom.domain.originaldance.entity.OriginalDanceRepository;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.google.api.services.youtube.YouTube;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class OriginalDanceService{

    private final OriginalDanceRepository originalDanceRepository;
//    private final FileService fileService;

    /** Global instance of the HTTP transport. */
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    /** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    /** Global instance of the max number of videos we want returned (50 = upper limit per page). */
    private static final long NUMBER_OF_VIDEOS_RETURNED = 5;  // 검색 개수
    /** Global instance of Youtube object to make all API requests. */
    private static YouTube youtube;

    private static final String GOOGLE_YOUTUBE_URL =  "https://www.youtube.com/watch?v=";
    private static final String YOUTUBE_SEARCH_FIELDS = "items(id/kind,id/videoId,snippet/title,snippet/description,snippet/channelTitle,snippet/thumbnails/high/url)";

//    private static final String YOUTUBE_APIKEY;
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

    //    public void searchChallenge(String keyword, int page) {
    public List<YoutubeResponseDto> searchChallenge(String searchQuery, int maxSearch) { //keyword, page

        // 유튜브 API 검색하기
        String queryTerm = searchQuery;
        log.info("Starting YouTube search... " +queryTerm);
        List<YoutubeResponseDto> rvalue = new ArrayList<>();

        try {
            if (youtube != null) {
                // Define the API request for retrieving search results.
                YouTube.Search.List search = youtube.search().list("id,snippet");

                String apiKey = YOUTUBE_APIKEY;
                search.setKey(apiKey);
                search.setQ(queryTerm);
                search.setType("");
                search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);

                String youTubeFields = YOUTUBE_SEARCH_FIELDS ;
                if (youTubeFields != null && !youTubeFields.isEmpty()) {
                    search.setFields(youTubeFields);
                } else {
                    search.setFields(YOUTUBE_SEARCH_FIELDS);
                }

                SearchListResponse searchResponse = search.execute();
                List<SearchResult> searchResultList = searchResponse.getItems();

                if (searchResultList != null) {
                    for (SearchResult rid : searchResultList) {
                        log.info(rid.toString());
                        YoutubeResponseDto youtubeResponseDto = YoutubeResponseDto.builder()
                            .url(GOOGLE_YOUTUBE_URL + rid.getId().getVideoId())
                            .title(rid.getSnippet().getTitle())
                            .channelName(rid.getSnippet().getChannelTitle())
                            .description(rid.getSnippet().getDescription())
                            .thumbnailPath(rid.getSnippet().getThumbnails().getHigh().getUrl())
                            .build();

                        log.info(youtubeResponseDto.toString());
                        rvalue.add(youtubeResponseDto);
                    }
                }
            }

        } catch (GoogleJsonResponseException e){
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
                + e.getDetails().getMessage());
        } catch(IOException e){
            System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch(Throwable t){
            t.printStackTrace();
        }

        return rvalue;
    }

    public void addCoordinate(Long originalDanceId, MultipartFile jsonFile) {
        // JSON파일 서버에 저장
//        String jsonPath = fileService.fileUpload("video", jsonFile);
        String jsonPath = null;

        // DB에 파일 위치 UPDATE
        OriginalDance originalDance = originalDanceRepository.findById(originalDanceId).orElse(null);
        if(originalDance != null){
            originalDance.updateJsonPath(jsonPath);
        }

    }
}