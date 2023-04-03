package com.choom.domain.user.dto;

import com.choom.global.model.GoogleUserInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SocialUserInfoDto {
    String identifier;
    String nickname;
    String profileImage;

    @Builder
    public SocialUserInfoDto(GoogleUserInfoResponse googleUserInfoResponse) {
        this.identifier = googleUserInfoResponse.getId();
        this.nickname = googleUserInfoResponse.getGiven_name();
        this.profileImage = googleUserInfoResponse.getPicture();
    }
}
