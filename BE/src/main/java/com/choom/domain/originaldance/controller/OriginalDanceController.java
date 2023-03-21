package com.choom.domain.originaldance.controller;

import com.choom.domain.originaldance.dto.YoutubeResponseDto;
import com.choom.domain.originaldance.service.OriginalDanceService;
import com.choom.global.common.BaseResponse;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/challenge")
@Slf4j
public class OriginalDanceController {

    @Autowired
    OriginalDanceService originalDanceService;

    @GetMapping()
    public BaseResponse searchChallenge(@RequestParam(name = "q")String keyword, @RequestParam int page){
        log.info("keyword : "+keyword+" page : "+page);
        List<YoutubeResponseDto> youtubeResponseDtos = originalDanceService.searchChallenge(keyword,page);
        return BaseResponse.success(youtubeResponseDtos);
    }
}
