package com.choom.domain.user.service;

import com.choom.domain.user.dto.KakaoOAuth2Dto;
import com.choom.domain.user.dto.KakaoUserInfoDto;
import com.choom.domain.user.dto.TokenDto;
import com.choom.domain.user.entity.*;
import com.choom.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final RedisService redisService;
    private final UserRepository userRepository;
    private final KakaoOAuth2Dto kakaoOAuth2Dto;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final BlacklistRedisRepository blacklistRedisRepository;

    public TokenDto kakaoLogin(String code) {
        KakaoUserInfoDto userInfo = kakaoOAuth2Dto.getUserInfo(code);
        String identifier = userInfo.getIdentifier();
        String nickname = userInfo.getNickname();
        String profileImage = userInfo.getProfileImage();

        User user = userRepository.findByIdentifierAndSocialType(identifier, SocialType.KAKAO).orElse(null);

        if (user == null) {
            user = User.builder()
                    .identifier(identifier)
                    .nickname(nickname)
                    .profileImage(profileImage)
                    .socialType(SocialType.KAKAO)
                    .build();
            userRepository.save(user);
        }

        return issueToken(user);
    }

    public TokenDto issueToken(User user) {
        TokenDto token = JwtTokenUtil.getToken(user.getIdentifier());
        redisService.saveToken(user.getId(), token.getRefreshToken());
        return token;
    }

    public TokenDto reissueToken(String refreshToken) {
        RefreshToken oldToken = refreshTokenRedisRepository.findByToken(refreshToken).orElse(null);
        if (refreshToken.equals(oldToken.getToken())) {
            User user = userRepository.findById(oldToken.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
            return issueToken(user);
        }
        return null;
    }

    public String logout(Long userId, String accessToken) {
        blacklistRedisRepository.save(Blacklist.builder()
                .token(accessToken)
                .build());
        RefreshToken token = refreshTokenRedisRepository.findById(userId).orElse(null);
        if (token != null) {
            return redisService.deleteToken(token);
        }
        return null;
    }

    public boolean isBlacklisted(String token) {
        if (blacklistRedisRepository.findById(token).isPresent()) {
            log.info("BlacklistedAccessToken : " + token);
            return true;
        }
        return false;
    }

    public ResponseCookie setCookie(String refreshToken, Integer expiration) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(expiration)
                .build();
        return cookie;
    }
}