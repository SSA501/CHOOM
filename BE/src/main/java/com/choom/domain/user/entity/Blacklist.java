package com.choom.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@RedisHash(value = "blacklist")
public class Blacklist {
    @Id
    private String token;

    @TimeToLive
    private static Integer expiration;

    @Value("${spring.jwt.expiration.atk}")
    public void setExpiration(Integer value){
        expiration = value;
    }

    @Builder
    public Blacklist(String token) {
        this.token = token;
    }
}
