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
        try {
            refreshTokenRedisRepository.save(RefreshToken.builder()
                    .userId(userId)
                    .refreshToken(refreshToken)
                    .build());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public String getRefreshToken(Long userId) {
        return refreshTokenRedisRepository.findById(userId)
                .orElseThrow(IllegalArgumentException::new)
                .getRefreshToken();
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
