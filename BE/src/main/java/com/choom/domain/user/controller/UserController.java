package com.choom.domain.user.controller;

import com.choom.domain.user.dto.AccessTokenDto;
import com.choom.domain.user.dto.TokenDto;
import com.choom.domain.user.dto.UserDetailsDto;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.service.AuthService;
import com.choom.domain.user.service.UserService;
import com.choom.global.auth.CustomUserDetails;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<BaseResponse> userDetails(@ApiIgnore Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        User user = customUserDetails.getUser();
        UserDetailsDto userDetailsDto = userService.findUserDetails(user);
        return new ResponseEntity<>(BaseResponse.success(userDetailsDto), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse> deleteUser(@ApiIgnore Authentication authentication, @ApiIgnore @RequestHeader("Authorization") String token) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        User user = customUserDetails.getUser();
        String accessToken = token.substring(7);
        String refreshToken = authService.logout(user.getId(), accessToken);
        authService.deleteUser(user);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", authService.setCookie(refreshToken, 0).toString());
        return new ResponseEntity<>(BaseResponse.success(null), headers, HttpStatus.OK);
    }

    @GetMapping("/login/kakao")
    public ResponseEntity<BaseResponse> kakaoLogin(@RequestParam String code, @Value("${jwt.expiration.rtk}") Integer expiration) {
        TokenDto token = authService.kakaoLogin(code);
        HttpHeaders headers = new HttpHeaders();
        ResponseCookie cookie = authService.setCookie(token.getRefreshToken(), expiration);
        headers.add("Set-Cookie", cookie.toString());
        log.info("cookie : " + cookie.toString());
        AccessTokenDto accessTokenDto = new AccessTokenDto(token.getAccessToken());
        return new ResponseEntity<>(BaseResponse.success(accessTokenDto), headers, HttpStatus.OK);
    }

    @PostMapping("/login/token")
    public ResponseEntity<BaseResponse> reissueToken(@CookieValue("refreshToken") String refreshToken, @Value("${jwt.expiration.rtk}") Integer expiration) {
        log.info("Cookie로 받은 refreshToken : " + refreshToken);
        TokenDto token = authService.reissueToken(refreshToken);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", authService.setCookie(refreshToken, expiration).toString());
        AccessTokenDto accessTokenDto = new AccessTokenDto(token.getAccessToken());
        return new ResponseEntity<>(BaseResponse.success(accessTokenDto), headers, HttpStatus.OK);
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

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<BaseResponse> checkNickname(@PathVariable String nickname) {
        boolean isNicknameAvailable = userService.isNicknameAvailable(nickname);
        if (isNicknameAvailable) {
            return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
        }
        return new ResponseEntity<>(BaseResponse.custom(400, "이미 존재하는 닉네임입니다.", null), HttpStatus.BAD_REQUEST);
    }
}
