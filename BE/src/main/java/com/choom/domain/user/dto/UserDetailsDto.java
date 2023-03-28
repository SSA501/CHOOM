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
    private UserMyDanceDto userMyDanceDto;

    @Builder
    public UserDetailsDto(User user, UserMyDanceDto userMyDanceDto) {
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();
        this.userMyDanceDto = userMyDanceDto;
    }
}