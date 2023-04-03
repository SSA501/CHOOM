package com.choom.global.service;

import com.choom.global.model.SocialAccessTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "kakaoAccessTokenService", url = "https://kauth.kakao.com/oauth/token")
public interface KakaoAccessTokenService {
    @PostMapping()
    SocialAccessTokenResponse getAccessToken(@RequestParam(name = "grant_type") String grantType,
                                             @RequestParam(name = "client_id") String clientId,
                                             @RequestParam(name = "redirect_uri") String redirectUrl,
                                             @RequestParam(name = "code") String code);
}