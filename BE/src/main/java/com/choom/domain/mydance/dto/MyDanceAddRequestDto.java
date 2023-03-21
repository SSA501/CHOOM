package com.choom.domain.mydance.dto;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MyDanceAddRequestDto {
    private Long originalDanceId;
    private double videoLength;
    private String title;
    private String result;
}
