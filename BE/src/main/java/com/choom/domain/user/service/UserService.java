package com.choom.domain.user.service;

import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.user.dto.UserDetailsDto;
import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final FileService fileService;
    private final UserRepository userRepository;
    private final MyDanceRepository myDanceRepository;

    public Optional<User> findUserByIdentifier(String identifier) {
        return userRepository.findByIdentifier(identifier);
    }

    @Transactional
    public UserDetailsDto findUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        UserMyDanceDto userMyDanceDto = myDanceRepository.findMyDanceInfoByUser(user);
        return UserDetailsDto.builder()
                .user(user)
                .userMyDanceDto(userMyDanceDto)
                .build();
    }

    public boolean isNicknameAvailable(String nickname) {
        return userRepository.findByNickname(nickname).isEmpty();
    }

    @Transactional
    public void modifyUserProfileImage(Long userId, MultipartFile profileImage) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        String profileImagePath = fileService.fileUpload("user", profileImage);
        user.updateProfileImage(profileImagePath);
        return;
    }

    @Transactional
    public void modifyUserNickname(Long userId, String nickname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        user.updateNickname(nickname);
        return;
    }
}