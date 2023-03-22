package com.choom.domain.user.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLoginResponseDto {
    private String accessToken;

    @Builder
    public UserLoginResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }
}
