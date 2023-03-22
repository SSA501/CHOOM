package com.choom.domain.mydance.dto;

import com.choom.domain.mydance.entity.MyDance;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AddMyDanceResponseDto {
    private Long id;
    private Long originalDanceId;
    private int score;
    private String matchRate;
    private String videoPath;
    private double videoLength;
    private String title;

    @Builder
    public AddMyDanceResponseDto(MyDance myDance) {
        this.id = myDance.getId();
        this.originalDanceId = myDance.getOriginalDance().getId();
        this.score = myDance.getScore();
        this.matchRate =myDance.getMatchRate();
        this.videoPath = myDance.getVideoPath();
        this.videoLength = myDance.getVideoLength();
        this.title = myDance.getTitle();
    }
}
