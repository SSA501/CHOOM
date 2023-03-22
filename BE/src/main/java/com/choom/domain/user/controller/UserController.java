package com.choom.domain.user.controller;

import com.choom.domain.user.dto.UserLoginResponseDto;
import com.choom.domain.user.entity.Token;
import com.choom.domain.user.service.UserService;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/login/kakao")
    public ResponseEntity<BaseResponse> kakaoLogin(@RequestParam String code) {
        log.info(code);
        Token token = userService.kakaoLogin(code);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", "refreshToken="+token.getRefreshToken());
        UserLoginResponseDto userLoginResponseDto = new UserLoginResponseDto(token.getAccessToken());
        return new ResponseEntity<>(BaseResponse.success(userLoginResponseDto), headers, HttpStatus.OK);
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
