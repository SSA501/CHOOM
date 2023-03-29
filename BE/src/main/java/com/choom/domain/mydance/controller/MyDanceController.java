package com.choom.domain.mydance.controller;

import com.choom.domain.mydance.dto.*;
import com.choom.domain.mydance.service.MyDanceService;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/mydance")
@Slf4j
@RequiredArgsConstructor
public class MyDanceController {

    private final MyDanceService myDanceService;

    @PostMapping()
    public ResponseEntity<BaseResponse> addMyDance(@RequestPart AddMyDanceRequestDto addMyDanceRequestDto,
                                   @RequestPart MultipartFile videoFile) throws IOException {
        log.info("AddMyDanceRequestDto : " + addMyDanceRequestDto);
        AddMyDanceResponseDto addMyDanceResponseDto = myDanceService.addMyDance(addMyDanceRequestDto, videoFile);
        return new ResponseEntity<>(BaseResponse.success(addMyDanceResponseDto), HttpStatus.OK);
    }

    @GetMapping("/{myDanceId}/download")
    public ResponseEntity<Resource> downloadMyDance(@PathVariable Long myDanceId) throws IOException {
        log.info("myDanceId : " + myDanceId);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<Resource>(myDanceService.downloadMyDance(myDanceId, headers), headers, HttpStatus.OK);
    }

    @DeleteMapping("/{myDanceId}")
    public ResponseEntity<BaseResponse> removeMyDance(@PathVariable Long myDanceId) throws UnknownHostException {
        log.info("myDanceId : " + myDanceId);
        myDanceService.removeMyDance(myDanceId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }

    @GetMapping("/{myDanceId}")
    public ResponseEntity<BaseResponse> myDanceDetails(@PathVariable Long myDanceId) {
        log.info("myDanceId : " + myDanceId);
        FindMyDanceResponseDto findMyDanceResponseDto = myDanceService.findMyDance(myDanceId);
        return new ResponseEntity<>(BaseResponse.success(findMyDanceResponseDto), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<BaseResponse> myDanceList(Pageable pageable) {
        log.info("pageable : " + pageable);
        Page<FindMyDanceResponseDto> findMyDanceResponseDtoList = myDanceService.findAllMyDance(pageable);
        return new ResponseEntity<>(BaseResponse.success(findMyDanceResponseDtoList), HttpStatus.OK);
    }

    @PutMapping("/{myDanceId}/shorts")
    public ResponseEntity<BaseResponse> addShorts(@PathVariable Long myDanceId,
                                                  @RequestParam String code) {
        log.info("myDanceId : " + myDanceId);
        log.info("code : " + code);
        AddShortsResponseDto addShortsResponseDto = myDanceService.addShorts(myDanceId, code);
        return new ResponseEntity<>(BaseResponse.success(addShortsResponseDto), HttpStatus.OK);
    }

    @PutMapping("/{myDanceId}/title")
    public ResponseEntity<BaseResponse> modifyTitle(@PathVariable Long myDanceId,
                                                    @RequestBody ModifyMyDanceRequestDto modifyMyDanceRequestDto) {
        log.info("myDanceId : " + myDanceId);
        log.info("modifyMyDanceRequestDto : " + modifyMyDanceRequestDto);
        FindMyDanceResponseDto findMyDanceResponseDto = myDanceService.modifyTitle(myDanceId, modifyMyDanceRequestDto);
        return new ResponseEntity<>(BaseResponse.success(findMyDanceResponseDto), HttpStatus.OK);
    }
}