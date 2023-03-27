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
import org.springframework.transaction.annotation.Transactional;

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
            User newUser = addUser(identifier, nickname, profileImage, SocialType.KAKAO);
            return issueToken(newUser);
        }

        return issueToken(user);
    }

    @Transactional
    public User addUser(String identifier, String nickname, String profileImage, SocialType socialType) {
        User user = User.builder()
                .identifier(identifier)
                .nickname(nickname)
                .profileImage(profileImage)
                .socialType(socialType)
                .build();
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public TokenDto issueToken(User user) {
        TokenDto token = JwtTokenUtil.getToken(user.getIdentifier());
        redisService.saveToken(user.getId(), token.getRefreshToken());
        return token;
    }

    public TokenDto reissueToken(String refreshToken) {
        RefreshToken oldToken = refreshTokenRedisRepository.findByToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("해당 토큰 값을 찾을 수 없습니다."));
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
