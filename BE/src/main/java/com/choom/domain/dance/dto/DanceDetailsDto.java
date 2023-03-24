package com.choom.domain.dance.dto;

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

    void changeStatus(int status){
        this.status = status;
    }

    @Builder
    public DanceDetailsDto(String title, int sec, String videoId, String description, String url,  String thumbnailPath, Long likeCount, Long viewCount, int userCount, int status) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.thumbnailPath = thumbnailPath;
        this.sec = sec;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.userCount = userCount;
        this.videoId = videoId;
        this.status = status;
    }
}
