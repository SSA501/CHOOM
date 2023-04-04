package com.choom.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value = "refreshToken")
public class RefreshToken {
    @TimeToLive
    private static Integer expiration;
    @Id
    private Long userId;
    @Indexed
    private String token;

    @Builder
    public RefreshToken(Long userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    @Value("${spring.jwt.expiration.rtk}")
    public void setExpiration(Integer value) {
        expiration = value;
    }
}
