package com.choom.domain.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserMyDanceDto {
    private Long challengeCount;
    private Integer challengeTime;
    private Double averageScore;

    public UserMyDanceDto(Long challengeCount, Integer challengeTime, Double averageScore) {
        this.challengeCount = challengeCount;
        this.challengeTime = challengeTime;
        this.averageScore = averageScore;
    }
}
