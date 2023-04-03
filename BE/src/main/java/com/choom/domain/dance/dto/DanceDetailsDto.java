package com.choom.domain.dance.dto;

import com.google.api.services.youtube.model.Video;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DanceDetailsDto {

    private Long id;
    private String title;
    private String url;
    private String thumbnailPath;
    private int sec;
    private int likeCount;
    private Long viewCount;
    private int userCount;
    private String youtubeId;
    private int status;
    private String publishedAt;
    private boolean isBookmarked;

    public void setId(Long id) {
        this.id = id;
    }

    public void setBookmark(boolean isBookmarked) {
        this.isBookmarked = isBookmarked;
    }

    @Builder
    public DanceDetailsDto(Long id, Video videoDetail, int sec, String youtubeId, String url,
        String thumbnailPath, int likeCount, Long viewCount, int userCount, int status,
        String publishedAt, boolean isBookmarked) {
        this.id = id;
        this.url = url;
        this.title = videoDetail.getSnippet().getTitle();
        this.thumbnailPath = videoDetail.getSnippet().getThumbnails().getHigh().getUrl();
        this.sec = sec;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.userCount = userCount;
        this.youtubeId = youtubeId;
        this.status = status;
        this.publishedAt = publishedAt;
        this.isBookmarked = isBookmarked;
    }
}
