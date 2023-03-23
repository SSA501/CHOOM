package com.choom.domain.user.service;

import com.choom.domain.user.dto.KakaoOAuth2Dto;
import com.choom.domain.user.dto.KakaoUserInfoDto;
import com.choom.domain.user.dto.TokenDto;
import com.choom.domain.user.entity.SocialType;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final KakaoOAuth2Dto kakaoOAuth2Dto;
    private final UserRepository userRepository;
    private final RedisService redisService;

    public Optional<User> findUserByIdentifier(String identifier) {
        return userRepository.findByIdentifier(identifier);
    }

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

        TokenDto token = JwtTokenUtil.getToken(identifier);

        redisService.saveToken(user.getId(), token.getRefreshToken());

        return token;
    }
}
