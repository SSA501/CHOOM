package com.choom.domain.user.controller;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "nicknameClient", url = "https://nickname.hwanmoo.kr/?")
public interface NicknameClient {

    @GetMapping()
    String getRandomNickname(@RequestParam String format,
        @RequestParam int count,
        @RequestParam int max_length,
        @RequestParam String whitespace);
}
