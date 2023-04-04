package com.choom.domain.mydance.dto;

import com.choom.domain.mydance.entity.MyDance;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FindMyDanceResponseDto {
    private Long id;
    private Long danceId;
    private int score;
    private String matchRate;
    private String videoPath;
    private String thumbnailPath;
    private int videoLength;
    private String title;
    private String youtubeUrl;
    private String createdAt;

    @Builder
    public FindMyDanceResponseDto(MyDance myDance) {
        this.id = myDance.getId();
        this.danceId = myDance.getDance().getId();
        this.score = myDance.getScore();
        this.matchRate = myDance.getMatchRate();
        this.videoPath = myDance.getVideoPath();
        this.thumbnailPath = myDance.getThumbnailPath();
        this.videoLength = myDance.getVideoLength();
        this.title = myDance.getTitle();
        this.youtubeUrl = myDance.getYoutubeUrl();
        this.createdAt = myDance.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
    }
}
