package com.choom.domain.user.service;

import com.choom.domain.user.dto.KakaoOAuth2Dto;
import com.choom.domain.user.dto.KakaoUserInfoDto;
import com.choom.domain.user.entity.SocialType;
import com.choom.domain.user.entity.Token;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final KakaoOAuth2Dto kakaoOAuth2Dto;
    private final UserRepository userRepository;

    public Optional<User> findUserByIdentifier(String identifier) {
        return userRepository.findByIdentifier(identifier);
    }

    public Token kakaoLogin(String code) {
        KakaoUserInfoDto userInfo = kakaoOAuth2Dto.getUserInfo(code);
        String identifier = userInfo.getIdentifier();
        String nickname = userInfo.getNickname();
        String profileImage = userInfo.getProfileImage();

        User user = userRepository.findByIdentifier(identifier).orElse(null);

        if (user == null) {
            user = User.builder()
                    .identifier(identifier)
                    .nickname(nickname)
                    .profileImage(profileImage)
                    .socialType(SocialType.valueOf("KAKAO"))
                    .build();
            userRepository.save(user);
        }

        String accessToken = JwtTokenUtil.getAccessToken(identifier);
        String refreshToken = JwtTokenUtil.getRefreshToken(identifier);

        // TODO: refreshToken Redis에 저장

        Token token = Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return token;
    }
}
