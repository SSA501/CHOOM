package com.choom.domain.dance.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DanceStatusDto {

    private int status;
    private String videoPath;
    private String jsonPath;

    @Builder
    public DanceStatusDto(int status, String videoPath, String jsonPath) {
        this.status = status;
        this.videoPath = videoPath;
        this.jsonPath = jsonPath;
    }
}
