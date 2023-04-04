package com.choom.domain.dance.dto;

import com.choom.domain.mydance.entity.MyDance;
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
    String profileImage;
    int score;
    int videoLength;
    String title;
    String youtubeUrl;

    @Builder
    public DanceRankUserDto(MyDance myDance) {
        this.userId = myDance.getUser().getId();
        this.profileImage = myDance.getUser().getProfileImage();
        this.nickname = myDance.getUser().getNickname();
        this.score = myDance.getScore();
        this.videoLength = myDance.getVideoLength();
        this.title = myDance.getTitle();
        this.youtubeUrl = myDance.getYoutubeUrl();
    }
}
