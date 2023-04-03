package com.choom.domain.user.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserMyDanceDto {
    private Long challengeCount;
    private Integer challengeTime;
    private Integer averageScore;
}
