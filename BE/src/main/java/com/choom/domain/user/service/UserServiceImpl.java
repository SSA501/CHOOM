package com.choom.domain.user.service;

import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUserByUserId(String userId) {
        return null;
    }
}
