package com.choom.domain.dance.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DanceRankUserDto {
    Long userId;
    String nickname;
    int score;
    int videoLength;
    String title;
    String youtubeUrl;
    String tiktokUrl;

    @Builder
    public DanceRankUserDto(Long userId, String nickname, int score, int videoLength,
        String title,
        String youtubeUrl, String tiktokUrl) {
        this.userId = userId;
        this.nickname = nickname;
        this.score = score;
        this.videoLength = videoLength;
        this.title = title;
        this.youtubeUrl = youtubeUrl;
        this.tiktokUrl = tiktokUrl;
    }
}
