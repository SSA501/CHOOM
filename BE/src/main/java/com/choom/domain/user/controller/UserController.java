package com.choom.domain.user.controller;

import com.choom.global.common.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

//  test
    @GetMapping()
    public BaseResponse test(){
        return BaseResponse.success(null);
    }
}
