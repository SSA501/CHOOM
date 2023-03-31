package com.choom.domain.mydance.controller;

import com.choom.domain.mydance.dto.*;
import com.choom.domain.mydance.service.MyDanceService;
import com.choom.global.auth.CustomUserDetails;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/mydance")
@Slf4j
@RequiredArgsConstructor
public class MyDanceController {

    private final MyDanceService myDanceService;

    @PostMapping()
    public ResponseEntity<BaseResponse> addMyDance(@ApiIgnore Authentication authentication, @RequestPart AddMyDanceRequestDto addMyDanceRequestDto,
                                                   @RequestPart MultipartFile videoFile) throws IOException {
        log.info("AddMyDanceRequestDto : " + addMyDanceRequestDto);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        AddMyDanceResponseDto addMyDanceResponseDto = myDanceService.addMyDance(userId, addMyDanceRequestDto, videoFile);
        return new ResponseEntity<>(BaseResponse.success(addMyDanceResponseDto), HttpStatus.OK);
    }

    @GetMapping("/{myDanceId}/download")
    public ResponseEntity<Resource> downloadMyDance(@ApiIgnore Authentication authentication,
                                                    @PathVariable Long myDanceId) throws IOException {
        log.info("myDanceId : " + myDanceId);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<Resource>(myDanceService.downloadMyDance(userId, myDanceId, headers), headers, HttpStatus.OK);
    }

    @DeleteMapping("/{myDanceId}")
    public ResponseEntity<BaseResponse> removeMyDance(@ApiIgnore Authentication authentication,
                                                      @PathVariable Long myDanceId) throws UnknownHostException {
        log.info("myDanceId : " + myDanceId);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        myDanceService.removeMyDance(userId, myDanceId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }

    @GetMapping("/{myDanceId}")
    public ResponseEntity<BaseResponse> myDanceDetails(@ApiIgnore Authentication authentication,
                                                       @PathVariable Long myDanceId) {
        log.info("myDanceId : " + myDanceId);
        FindMyDanceResponseDto findMyDanceResponseDto = myDanceService.findMyDance(myDanceId);
        return new ResponseEntity<>(BaseResponse.success(findMyDanceResponseDto), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<BaseResponse> myDanceList(@ApiIgnore Authentication authentication,
                                                    Pageable pageable) {
        log.info("pageable : " + pageable);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        Page<FindMyDanceResponseDto> findMyDanceResponseDtoList = myDanceService.findAllMyDance(userId, pageable);
        return new ResponseEntity<>(BaseResponse.success(findMyDanceResponseDtoList), HttpStatus.OK);
    }

    @PutMapping("/{myDanceId}/shorts")
    public ResponseEntity<BaseResponse> addShorts(@ApiIgnore Authentication authentication,
                                                  @PathVariable Long myDanceId,
                                                  @RequestParam String code) {
        log.info("myDanceId : " + myDanceId);
        log.info("code : " + code);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        AddShortsResponseDto addShortsResponseDto = myDanceService.addShorts(userId, myDanceId, code);
        return new ResponseEntity<>(BaseResponse.success(addShortsResponseDto), HttpStatus.OK);
    }

    @PutMapping("/{myDanceId}/title")
    public ResponseEntity<BaseResponse> modifyTitle(@ApiIgnore Authentication authentication,
                                                    @PathVariable Long myDanceId,
                                                    @RequestBody ModifyMyDanceRequestDto modifyMyDanceRequestDto) {
        log.info("myDanceId : " + myDanceId);
        log.info("modifyMyDanceRequestDto : " + modifyMyDanceRequestDto);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        FindMyDanceResponseDto findMyDanceResponseDto = myDanceService.modifyTitle(userId, myDanceId, modifyMyDanceRequestDto);
        return new ResponseEntity<>(BaseResponse.success(findMyDanceResponseDto), HttpStatus.OK);
    }
}