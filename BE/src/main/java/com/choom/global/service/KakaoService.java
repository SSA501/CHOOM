package com.choom.global.service;

import com.choom.domain.user.dto.SocialUserInfoDto;
import com.choom.global.model.KakaoUserInfoResponse;
import com.choom.global.model.SocialAccessTokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoService {
    private static String KAKAO_APIKEY;
    private static String KAKAO_REDIRECT_URI;
    private final KakaoAccessTokenService kakaoAccessTokenService;
    private final KakaoUserInfoService kakaoUserInfoService;

    @Value("${apikey.kakao}")
    public void setKakaoApikey(String value){
        KAKAO_APIKEY = value;
    }

    @Value("${redirect-uri.kakao}")
    public void setKakaoRedirectUri(String value){
        KAKAO_REDIRECT_URI = value;
    }

    public SocialUserInfoDto getUserInfo(String code) {
        String accessToken = getAccessToken(code);
        log.info("카카오 accessToken : " + accessToken);
        return getUserInfoByToken(accessToken);
    }

    private String getAccessToken(String code) {
        SocialAccessTokenResponse socialAccessTokenResponse = kakaoAccessTokenService.getAccessToken("authorization_code", KAKAO_APIKEY, KAKAO_REDIRECT_URI, code);
        return socialAccessTokenResponse.getAccess_token();
    }

    public SocialUserInfoDto getUserInfoByToken(String accessToken){

        KakaoUserInfoResponse kakaoUserInfoResponse = kakaoUserInfoService.getUserInfo("Bearer " + accessToken);
        return new SocialUserInfoDto(kakaoUserInfoResponse);
    }
}
