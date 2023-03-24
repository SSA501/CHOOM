package com.choom.domain.user.service;

import com.choom.domain.user.dto.KakaoOAuth2Dto;
import com.choom.domain.user.dto.KakaoUserInfoDto;
import com.choom.domain.user.dto.TokenDto;
import com.choom.domain.user.entity.RefreshToken;
import com.choom.domain.user.entity.SocialType;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final RedisService redisService;
    private final UserRepository userRepository;
    private final KakaoOAuth2Dto kakaoOAuth2Dto;

    public TokenDto kakaoLogin(String code) {
        KakaoUserInfoDto userInfo = kakaoOAuth2Dto.getUserInfo(code);
        String identifier = userInfo.getIdentifier();
        String nickname = userInfo.getNickname();
        String profileImage = userInfo.getProfileImage();

        User user = userService.findUserByIdentifierAndSocialType(identifier, SocialType.KAKAO).orElse(null);

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
        RefreshToken oldToken = redisService.findRefreshTokenByToken(refreshToken);
        if (refreshToken.equals(oldToken.getToken())) {
            User user = userService.findUserById(oldToken.getUserId())
                    .orElseThrow(() -> new IllegalAccessError("존재하지 않는 유저입니다."));
            return issueToken(user);
        }
        return null;
    }
}
