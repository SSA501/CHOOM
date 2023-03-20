package com.choom.domain.user.service;

import com.choom.domain.user.dto.KakaoOAuth2;
import com.choom.domain.user.dto.KakaoUserInfo;
import com.choom.domain.user.entity.SocialType;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final KakaoOAuth2 kakaoOAuth2;

    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findUserByIdentifier(String identifier) {

        return userRepository.findByIdentifier(identifier);
    }

    @Override
    public void kakaoLogin(String code) {
        System.out.println(code);
        KakaoUserInfo userInfo = kakaoOAuth2.getUserInfo(code);
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
    }
}
