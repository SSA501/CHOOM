package com.choom.global.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "randomNicknameService", url = "https://nickname.hwanmoo.kr/?")
public interface RandomNicknameService {

    @GetMapping()
    String getRandomNickname(@RequestParam(name = "format") String format,
                             @RequestParam(name = "count") int count,
                             @RequestParam(name = "max_length") int max_length,
                             @RequestParam(name = "whitespace") String whitespace);
}
