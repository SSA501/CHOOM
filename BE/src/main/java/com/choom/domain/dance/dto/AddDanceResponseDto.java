package com.choom.domain.dance.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddDanceResponseDto {

    Long danceId;

    @Builder
    public AddDanceResponseDto(Long danceId) {
        this.danceId = danceId;
    }
}
