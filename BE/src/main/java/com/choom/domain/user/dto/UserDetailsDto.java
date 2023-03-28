package com.choom.domain.user.dto;

import com.choom.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDetailsDto {
    private String nickname;
    private String profileImage;
    private int challengeCount;
    private double challengeTime;
    private int averageScore;

    @Builder
    public UserDetailsDto(User user, int challengeCount, double challengeTime, int averageScore) {
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();
        this.challengeCount = challengeCount;
        this.challengeTime = challengeTime;
        this.averageScore = averageScore;
    }
}