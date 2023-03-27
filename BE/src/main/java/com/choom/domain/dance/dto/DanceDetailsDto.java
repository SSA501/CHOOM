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

    private String title;
    private String description;
    private String url;
    private String thumbnailPath;
    private int sec;
    private Long likeCount;
    private Long viewCount;
    private int userCount;
    private String videoId;
    private int status;
    private String publishedAt;

    @Builder
    public DanceDetailsDto(Video videoDetail, int sec, String videoId, String url,  String thumbnailPath, Long likeCount, Long viewCount, int userCount, int status, String publishedAt) {
        this.url = url;
        this.title = videoDetail.getSnippet().getTitle();
        this.description = videoDetail.getSnippet().getDescription();
        this.thumbnailPath = thumbnailPath;
        this.sec = sec;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.userCount = userCount;
        this.videoId = videoId;
        this.status = status;
        this.publishedAt = publishedAt;
    }
}
