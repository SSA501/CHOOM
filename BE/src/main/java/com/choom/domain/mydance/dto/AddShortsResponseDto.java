package com.choom.domain.mydance.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AddShortsResponseDto {
    private String youtubeUrl;

    @Builder
    public AddShortsResponseDto(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }
}