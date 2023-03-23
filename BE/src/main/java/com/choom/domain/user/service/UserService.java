package com.choom.domain.user.service;

import com.choom.domain.user.entity.SocialType;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByIdentifier(String identifier) {
        return userRepository.findByIdentifier(identifier);
    }

    public Optional<User> findUserByIdentifierAndSocialType(String identifier, SocialType socialType) {
        return userRepository.findByIdentifierAndSocialType(identifier, socialType);
    }
}
