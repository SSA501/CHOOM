package com.choom.domain.user.service;

import com.choom.domain.user.entity.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findUserById(Long userId);
    Optional<User> findUserByIdentifier(String identifier);

    void kakaoLogin(String code);
}
