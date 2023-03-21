package com.choom.domain.mydance.controller;

import com.choom.domain.mydance.dto.MyDanceAddRequestDto;
import com.choom.domain.mydance.service.MyDanceService;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/mydance")
@Slf4j
@RequiredArgsConstructor
public class MyDanceController {

    private final MyDanceService myDanceService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponse addMyDance(@RequestPart MyDanceAddRequestDto myDanceAddRequestDto,
                                       @RequestPart MultipartFile videoFile,
                                       @RequestPart MultipartFile jsonFile) throws IOException {
        log.info("MyDanceAddRequestDto : " + myDanceAddRequestDto);
        myDanceService.addMyDance(myDanceAddRequestDto, videoFile, jsonFile);
        return BaseResponse.success(null);
    }
}
