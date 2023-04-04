package com.choom.domain.user.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserMyDanceDto {
    private Long challengeCount;
    private Integer challengeTime;
    private Integer averageScore;
}
