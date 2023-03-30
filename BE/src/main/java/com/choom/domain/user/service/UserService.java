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

    @Transactional
    public void modifyUserProfileImage(User user, MultipartFile profileImage) throws IOException {
        String profileImagePath = fileService.fileUpload("user", profileImage);
        user.updateProfileImage(profileImagePath);
        userRepository.save(user);
        user.getProfileImage();
        return;
    }

    @Transactional
    public void modifyUserNickname(User user, String nickname) {
        user.updateNickname(nickname);
        userRepository.save(user);
        return;
    }
}