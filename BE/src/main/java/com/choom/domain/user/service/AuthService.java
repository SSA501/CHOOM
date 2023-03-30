package com.choom.domain.user.service;

import com.choom.domain.user.dto.SocialUserInfoDto;
import com.choom.domain.user.dto.TokenDto;
import com.choom.domain.user.entity.*;
import com.choom.global.service.GoogleService;
import com.choom.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final GoogleService googleService;
    private final RedisService redisService;
    private final UserRepository userRepository;
    private final KakaoService kakaoService;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final BlacklistRedisRepository blacklistRedisRepository;

    @Transactional
    public TokenDto kakaoLogin(String code) {
        SocialUserInfoDto userInfo = kakaoService.getUserInfo(code);
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
    public TokenDto socialLogin(String type, String code) {
        SocialUserInfoDto userInfo = null;
        SocialType socialType = null;

        if ("GOOGLE".equals(type)) {
            userInfo = googleService.getUserInfo(code);
            socialType = SocialType.GOOGLE;
        } else if ("KAKAO".equals(type)) {
            userInfo = kakaoService.getUserInfo(code);
            socialType = SocialType.KAKAO;
        }

        String identifier = userInfo.getIdentifier();
        String nickname = userInfo.getNickname();
        String profileImage = userInfo.getProfileImage();

        User user = userRepository.findByIdentifierAndSocialType(identifier, socialType).orElse(null);

        if (user == null) {
            User newUser = addUser(identifier, nickname, profileImage, socialType);
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
        Optional<RefreshToken> token1 = refreshTokenRedisRepository.findByToken(token.getRefreshToken());
        if (token1.isEmpty()) {
            log.info("refreshToken 저장 안 됨");
        } else {
            log.info("refreshToken 저장 : " + token1.get().getToken());
        }
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
        log.info("create Cookie");
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(expiration/1000)
                .build();
        return cookie;
    }
}