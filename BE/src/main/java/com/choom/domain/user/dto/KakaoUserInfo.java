package com.choom.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUserInfo {
    String identifier;
    String nickname;
    String profileImage;
}
