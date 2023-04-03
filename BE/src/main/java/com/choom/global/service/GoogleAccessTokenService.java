package com.choom.global.service;

import com.choom.global.model.GoogleAccessTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "googleAccessTokenService", url = "https://oauth2.googleapis.com/token")
public interface GoogleAccessTokenService {

    @PostMapping()
    GoogleAccessTokenResponse getAccessToken(@RequestParam("code") String code,
                                             @RequestParam("client_id") String client_id,
                                             @RequestParam("client_secret") String client_secret,
                                             @RequestParam("redirect_uri") String redirect_uri,
                                             @RequestParam("grant_type") String grant_type);
}