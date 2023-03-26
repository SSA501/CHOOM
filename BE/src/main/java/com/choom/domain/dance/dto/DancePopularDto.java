package com.choom.domain.dance.dto;

import com.choom.domain.dance.entity.Dance;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class DancePopularDto {
    private Long id;
    private String title;
    private String url;
    private String videoPath;
    private String thumbnailPath;
    private int userCount;
    private int status;

    public DancePopularDto(Dance dance) {
        this.id = dance.getId();
        this.title = dance.getTitle();
        this.url = dance.getUrl();
        this.videoPath = dance.getVideoPath();
        this.thumbnailPath = dance.getThumbnailPath();
        this.userCount = dance.getUserCount();
        this.status = dance.getStatus();
    }

    @Builder
    public DancePopularDto(Long id, String title, String url, String videoPath,
        String thumbnailPath,
        int userCount, int status) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.videoPath = videoPath;
        this.thumbnailPath = thumbnailPath;
        this.userCount = userCount;
        this.status = status;
    }
}