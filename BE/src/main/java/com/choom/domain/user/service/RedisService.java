package com.choom.domain.user.service;

import com.choom.domain.user.entity.RefreshToken;
import com.choom.domain.user.entity.RefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisService {

    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Transactional
    public void saveToken(Long userId, String refreshToken) {
        RefreshToken token = findRefreshTokenByUserId(userId);
        if (token != null) {
            deleteToken(token);
        }
        refreshTokenRedisRepository.save(RefreshToken.builder()
                .userId(userId)
                .token(refreshToken)
                .build());
    }

    public RefreshToken findRefreshTokenByToken(String token) {
        return refreshTokenRedisRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("만료된 토큰값입니다"));
    }

    public RefreshToken findRefreshTokenByUserId(Long userId) {
        return refreshTokenRedisRepository.findById(userId).orElse(null);
    }

    @Transactional
    public void deleteToken(RefreshToken token) {
        try {
            refreshTokenRedisRepository.delete(token);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
