package com.choom.domain.mydance.controller;

import com.choom.domain.mydance.service.MyDanceService;
import com.choom.global.common.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mychallenge")
@Slf4j
public class MyDanceController {

    @Autowired
    MyDanceService myDanceService;

    @PostMapping()
    public BaseResponse myChallengeAdd() throws ParseException {
        log.info("myChallengeAdd");

        // 현재 original dance 좌표값이 없기 때문에 더미 데이터로 테스트
        String similarity = myDanceService.calculateSimilarity(1L,"테스트");

        return BaseResponse.success(similarity);
    }
}
