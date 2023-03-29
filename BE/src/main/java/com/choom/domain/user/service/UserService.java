package com.choom.domain.user.service;

import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.dto.UserDetailsDto;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final MyDanceRepository myDanceRepository;

    public Optional<User> findUserByIdentifier(String identifier) {
        return userRepository.findByIdentifier(identifier);
    }

    @Transactional
    public UserDetailsDto findUserDetails(User user) {
        UserMyDanceDto userMyDanceDto = myDanceRepository.findMyDanceInfoByUser(user);
        return UserDetailsDto.builder()
                .user(user)
                .userMyDanceDto(userMyDanceDto)
                .build();
    }

    public boolean isNicknameAvailable(String nickname) {
        return userRepository.findByNickname(nickname).isEmpty();
    }
}