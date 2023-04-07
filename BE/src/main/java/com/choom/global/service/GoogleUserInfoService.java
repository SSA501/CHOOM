package com.choom.global.service;

import com.choom.global.model.GoogleUserInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "googleUserInfoService", url = "https://www.googleapis.com/oauth2/v2/userinfo")
public interface GoogleUserInfoService {

    @GetMapping()
    GoogleUserInfoResponse getUserInfo(@RequestHeader("Authorization") String accessToken);

}