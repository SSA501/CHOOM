package com.choom.domain.user.service;

import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByIdentifier(String identifier) {

        return userRepository.findByIdentifier(identifier);
    }
}
