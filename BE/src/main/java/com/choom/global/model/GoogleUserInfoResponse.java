package com.choom.global.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GoogleUserInfoResponse {
    private String id;
    private String given_name;
    private String picture;
}