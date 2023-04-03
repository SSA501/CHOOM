package com.choom.domain.dance.dto;

import com.choom.domain.dance.entity.Dance;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PopularDanceDto {

    private Long id;
    private String title;
    private String url;
    private String videoPath;
    private String thumbnailPath;
    private int userCount;
    private int status;

    public PopularDanceDto(Dance dance) {
        this.id = dance.getId();
        this.title = dance.getTitle();
        this.url = dance.getUrl();
        this.videoPath = dance.getVideoPath();
        this.thumbnailPath = dance.getThumbnailPath();
        this.userCount = dance.getUserCount();
        this.status = dance.getStatus();
    }
}