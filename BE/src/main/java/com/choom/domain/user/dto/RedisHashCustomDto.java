package com.choom.domain.user.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RedisHashCustomDto {
    private static Integer expiration;

    public static Integer getExpiration() {
        return expiration;
    }

    @Value("${jwt.expiration.rtk}")
    public void setExpiration(Integer expiration) {
        this.expiration = expiration;
    }
}
