package com.choom.global.service;

import com.choom.global.model.KakaoUserInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "kakaoUserInfoService", url = "https://kapi.kakao.com/v2/user/me")
public interface KakaoUserInfoService {
    @PostMapping()
    KakaoUserInfoResponse getUserInfo(@RequestHeader("Authorization") String accessToken);
}
