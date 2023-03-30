package com.choom.domain.mydance.dto;

import com.choom.domain.mydance.entity.MyDance;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AddMyDanceResponseDto {
    private Long id;
    private Long danceId;
    private int score;
    private String matchRate;
    private String videoPath;
    private String title;

    @Builder
    public AddMyDanceResponseDto(MyDance myDance) {
        this.id = myDance.getId();
        this.danceId = myDance.getDance().getId();
        this.score = myDance.getScore();
        this.matchRate =myDance.getMatchRate();
        this.videoPath = myDance.getVideoPath();
        this.title = myDance.getTitle();
    }
}
