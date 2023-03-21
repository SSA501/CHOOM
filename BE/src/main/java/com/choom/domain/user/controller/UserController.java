package com.choom.domain.user.controller;

import com.choom.domain.user.service.UserService;
import com.choom.global.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/login/oauth2/code/kakao")
    public void kakaoLogin(@RequestParam String code) {
        log.info(code);
        userService.kakaoLogin(code);
    }

//  test
    @GetMapping()
    public BaseResponse test(){
        log.info("INFO");
        log.debug("DEBUG");
        log.warn("WARN");
        log.error("ERROR");
        return BaseResponse.success(null);
    }
}
