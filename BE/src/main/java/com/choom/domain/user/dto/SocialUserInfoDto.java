package com.choom.domain.user.dto;

import com.choom.global.model.GoogleUserInfoResponse;
import com.choom.global.model.KakaoUserInfoResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SocialUserInfoDto {
    String identifier;
    String profileImage;

    public SocialUserInfoDto(GoogleUserInfoResponse googleUserInfoResponse) {
        this.identifier = googleUserInfoResponse.getId();
        this.profileImage = googleUserInfoResponse.getPicture();
    }

    public SocialUserInfoDto(KakaoUserInfoResponse kakaoUserInfoResponse) {
        this.identifier = kakaoUserInfoResponse.getId();
        this.profileImage = kakaoUserInfoResponse.getKakao_account().getProfile().getProfile_image_url();
    }
}
