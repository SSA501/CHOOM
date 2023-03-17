package com.choom.domain.user.service;

import com.choom.domain.user.entity.User;
import java.util.Optional;

public interface UserService {
    Optional<User> getUserById(Long userId);
    Optional<User> getUserByIdentifier(String identifier);
}
