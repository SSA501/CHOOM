package com.choom.global.service;

import com.choom.domain.bookmark.entity.BookmarkRepository;
import com.choom.domain.dance.dto.DanceDetailsDto;
import com.choom.domain.dance.entity.Dance;
import com.choom.domain.dance.entity.DanceRepository;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class YoutubeService {

    private final DanceRepository danceRepository;
    private final BookmarkRepository bookmarkRepository;

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    private static YouTube youtube;

    private static final String GOOGLE_YOUTUBE_URL = "https://www.youtube.com/shorts/";
    private static final String YOUTUBE_SEARCH_FIELDS1 = "nextPageToken, prevPageToken, pageInfo, items(id/videoId,snippet/title,snippet/channelTitle)";
    private static final String YOUTUBE_SEARCH_FIELDS2 = "items(contentDetails/duration,snippet/title, snippet/description,snippet/publishedAt, snippet/thumbnails/high/url,statistics/likeCount,statistics/viewCount)";

    private static final String SEARCH_SUFFIX = "#챌린지 #댄스 #쇼츠 #shorts";

    public static SearchListResponse searchResponse = null;
    public static VideoListResponse videoListResponse = null;

    private static String YOUTUBE_APIKEY;

    @Value("${apikey.youtube}")
    public void setKey(String value) {
        YOUTUBE_APIKEY = value;
    }

    static {
        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
            public void initialize(HttpRequest request) throws IOException {
            }
        }).setApplicationName("youtube-cmdline-search-sample").build();
    }

    public void keywordSearch(Long userId, String keyword, String pageToken, Long size,
        List<DanceDetailsDto> danceDetailDtoList) {
        YouTube.Search.List search = null;
        try {
            search = youtube.search().list("snippet");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        search.setKey(YOUTUBE_APIKEY);
        search.setQ(keyword + " " + SEARCH_SUFFIX);
        search.setType("video");
        search.setVideoDuration("short");
        search.setMaxResults(size);
        search.setFields(YOUTUBE_SEARCH_FIELDS1);
        search.setPageToken(pageToken);
        search.setVideoSyndicated("true");

        try {
            searchResponse = search.execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        List<SearchResult> searchResultList = searchResponse.getItems();

        if (searchResultList != null) {
            long startTime = System.currentTimeMillis(); // 현재 시간을 밀리초로 가져옵니다.
            long elapsedTime = 0L; // 경과 시간을 초기화합니다.
            long maxTime = 3000L; // 최대 실행 시간을 3초로 설정합니다.

            for (SearchResult video : searchResultList) {
                // 비동기로 검색 -> 검색 속도 향상
                String youtubeId = video.getId().getVideoId();
                DanceDetailsDto danceDetailDto = getVideoDetail(userId, youtubeId);
                danceDetailDtoList.add(danceDetailDto);

                elapsedTime = System.currentTimeMillis() - startTime; // 경과 시간을 계산합니다.
                if (elapsedTime > maxTime) { // 경과 시간이 최대 시간보다 작으면 반복합니다.
                    log.info("시간초과로 종료됨!");
                    break;
                }
            }

            Collections.sort(danceDetailDtoList,
                (o1, o2) -> {
                    // DB에 있는 정보 먼저
                    int id1 = (o1.getId() == null) ? 1 : 0;
                    int id2 = (o2.getId() == null) ? 1 : 0;

                    if (id1 == id2) {
                        // 챌린지 참여자 수 -> 원본 영상 시청자 순 으로 정렬
                        if (o1.getUserCount() == o2.getUserCount()) {
                            return (int) (o2.getViewCount() - o1.getViewCount());
                        } else {
                            return o2.getUserCount() - o1.getUserCount();
                        }
                    } else {
                        return id1 - id2;
                    }
                });
        }
    }

    public void urlSearch(Long userId, String keyword, List<DanceDetailsDto> danceDetailDtoList) {
        if (keyword.contains("?")) {
            keyword = keyword.split("\\?")[0];
        }
        String[] urlList = keyword.split("/");
        keyword = urlList[urlList.length - 1];
        log.info("url검색 - keyword : " + keyword);

        DanceDetailsDto danceDetailDto = getVideoDetail(userId, keyword);
        if (danceDetailDto != null) {
            Dance dance = danceRepository.findByYoutubeId(keyword).orElse(null);
            if (dance == null) { //처음인경우
                Dance newDance = Dance.builder()
                    .danceDetailDto(danceDetailDto)
                    .build();
                danceRepository.save(newDance);
                danceDetailDto.setId(newDance.getId());
            }
            danceDetailDtoList.add(danceDetailDto);
        }
    }

    @Async
    public DanceDetailsDto getVideoDetail(Long userId, String youtubeId) {
        YouTube.Videos.List videoDetails = null;
        try {
            videoDetails = youtube.videos().list("contentDetails");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        videoDetails.setKey(YOUTUBE_APIKEY);
        videoDetails.setId(youtubeId);
        videoDetails.setPart("statistics,snippet,contentDetails");
        videoDetails.setFields(YOUTUBE_SEARCH_FIELDS2);

        try {
            videoListResponse = videoDetails.execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (videoListResponse.getItems().size() == 0) {
            //잘못 된 검색인 경우
            return null;
        }
        Video videoDetail = videoListResponse.getItems().get(0);
        //1분 이내 영상인지 확인
        String time = videoDetail.getContentDetails().getDuration();
        if (time.equals("P0D") || time.contains("M")) { // P0D는 라이브 방송
            return null;
        }

        Long viewCount = 0L;
        if (videoDetail.getStatistics().getViewCount() != null) {
            viewCount = videoDetail.getStatistics().getViewCount().longValue();
        }

        String url = GOOGLE_YOUTUBE_URL + youtubeId;
        Dance dance = danceRepository.findByYoutubeId(youtubeId).orElse(null);

        Long id = null;
        if (dance != null) {
            id = dance.getId();
        }

        int userCount = 0;
        int status = 0;
        int likeCount = 0;
        Boolean isBookmarked = false;
        if (dance != null) {
            userCount = dance.getUserCount();
            status = dance.getStatus();
            likeCount = dance.getBookmarkSize();
            if (bookmarkRepository.findBookmarkByUserIdAndDanceId(userId, dance.getId())
                .isPresent()) {
                isBookmarked = true;
            }
        }
        String publishedAt = String.valueOf(videoDetail.getSnippet().getPublishedAt())
            .split("T")[0];
        //1분 이내인 경우
        int s = Integer.parseInt(time.split("T")[1].split("S")[0]);

        return DanceDetailsDto.builder()
            .id(id)
            .url(url)
            .videoDetail(videoDetail)
            .sec(s)
            .likeCount(likeCount)
            .viewCount(viewCount)
            .userCount(userCount)
            .youtubeId(youtubeId)
            .status(status)
            .publishedAt(publishedAt)
            .isBookmarked(isBookmarked)
            .build();
    }
}
