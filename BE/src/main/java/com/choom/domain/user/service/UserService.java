package com.choom.domain.user.service;

import com.choom.domain.user.entity.User;

public interface UserService {
    User getUserByUserId(String userId);
}
