package com.choom.domain.mydance.controller;

import com.choom.domain.mydance.dto.AddMyDanceRequestDto;
import com.choom.domain.mydance.dto.AddMyDanceResponseDto;
import com.choom.domain.mydance.service.MyDanceService;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/mydance")
@Slf4j
@RequiredArgsConstructor
public class MyDanceController {

    private final MyDanceService myDanceService;

    @PostMapping()
    public ResponseEntity<BaseResponse> addMyDance(@RequestPart AddMyDanceRequestDto myDanceAddRequestDto,
                                   @RequestPart MultipartFile videoFile) throws IOException {
        log.info("MyDanceAddRequestDto : " + myDanceAddRequestDto);
        AddMyDanceResponseDto myDanceAddResponseDto = myDanceService.addMyDance(myDanceAddRequestDto, videoFile);
        return new ResponseEntity<>(BaseResponse.success(myDanceAddResponseDto), HttpStatus.OK);
    }

    @GetMapping("/{myDanceId}/download")
    public ResponseEntity<Resource> downloadMyDance(@PathVariable Long myDanceId) throws IOException {
        log.info("myDanceId : " + myDanceId);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<Resource>(myDanceService.downloadMyDance(myDanceId, headers), headers, HttpStatus.OK);
    }

    @DeleteMapping("/{myDanceId}")
    public ResponseEntity<BaseResponse> removeMyDance(@PathVariable Long myDanceId) {
        log.info("myDanceId : " + myDanceId);
        myDanceService.removeMyDance(myDanceId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}