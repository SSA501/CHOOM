package com.choom.domain.user.controller;

import com.choom.domain.user.dto.TokenDto;
import com.choom.domain.user.dto.UserLoginResponseDto;
import com.choom.domain.user.entity.RefreshTokenRedisRepository;
import com.choom.domain.user.service.AuthService;
import com.choom.domain.user.service.RedisService;
import com.choom.global.auth.CustomUserDetails;
import com.choom.global.model.BaseResponse;
import com.choom.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final RedisService redisService;
    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @GetMapping("/login/kakao")
    public ResponseEntity<BaseResponse> kakaoLogin(@RequestParam String code, @Value("${jwt.expiration.rtk}") Integer expiration) {
        TokenDto token = authService.kakaoLogin(code);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", authService.setCookie(token.getRefreshToken(), expiration).toString());
        UserLoginResponseDto userLoginResponseDto = new UserLoginResponseDto(token.getAccessToken());
        return new ResponseEntity<>(BaseResponse.success(userLoginResponseDto), headers, HttpStatus.OK);
    }

    @PostMapping("/login/token")
    public ResponseEntity<BaseResponse> reissueToken(@RequestHeader("Cookie") String refreshToken, @Value("${jwt.expiration.rtk}") Integer expiration) {
        TokenDto token = authService.reissueToken(refreshToken);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", authService.setCookie(refreshToken, expiration).toString());
        UserLoginResponseDto userLoginResponseDto = new UserLoginResponseDto(token.getAccessToken());
        return new ResponseEntity<>(BaseResponse.success(userLoginResponseDto), headers, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<BaseResponse> logout(@ApiIgnore Authentication authentication, @ApiIgnore @RequestHeader("Authorization") String token) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        String accessToken = token.substring(7);
        String refreshToken = authService.logout(userId, accessToken);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", authService.setCookie(refreshToken, 0).toString());
        return new ResponseEntity<>(BaseResponse.success(null), headers, HttpStatus.OK);
    }
}
