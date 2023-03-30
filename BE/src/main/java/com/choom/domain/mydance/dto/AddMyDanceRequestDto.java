package com.choom.domain.mydance.dto;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AddMyDanceRequestDto {
    private Long danceId;
    private String title;
    private String matchRate;
    private int score;
}
