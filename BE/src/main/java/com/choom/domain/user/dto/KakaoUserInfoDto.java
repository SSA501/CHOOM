package com.choom.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUserInfoDto {
    String identifier;
    String nickname;
    String profileImage;
}
