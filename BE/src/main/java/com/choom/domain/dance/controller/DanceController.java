package com.choom.domain.dance.controller;

import com.choom.domain.dance.dto.DanceDetailsWithRankDto;
import com.choom.domain.dance.dto.DanceSearchDto;
import com.choom.domain.dance.dto.PopularDanceDto;
import com.choom.domain.dance.dto.DanceStatusDto;
import com.choom.domain.dance.service.DanceService;
import com.choom.global.auth.CustomUserDetails;
import com.choom.global.model.BaseResponse;
import com.sapher.youtubedl.YoutubeDLException;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/dance")
@Slf4j
@RequiredArgsConstructor
public class DanceController {

    private final DanceService danceService;

    @GetMapping()
    public ResponseEntity<BaseResponse> searchDance(@ApiIgnore Authentication authentication, @RequestParam String keyword, @RequestParam(required = false) String pageToken, @RequestParam Long size){
        log.info("keyword : "+keyword+" pageToken : "+pageToken+" size : "+size);
        DanceSearchDto danceSearchDto = danceService.searchDance(keyword,pageToken,size);
        return new ResponseEntity<>(BaseResponse.success(danceSearchDto), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<BaseResponse> popularDance() {
        log.info("start popularDance");
        List<PopularDanceDto> popularDanceDtoList = danceService.findPopularDance();
        return new ResponseEntity<>(BaseResponse.success(popularDanceDtoList), HttpStatus.OK);
    }

    @PostMapping("/{youtubeId}")
    public ResponseEntity<BaseResponse> addDance(@ApiIgnore Authentication authentication, @PathVariable String youtubeId) throws IOException {
        log.info("youtubeId : "+youtubeId);
        Long danceId = danceService.addDance(youtubeId);
        HashMap<String, Long> response = new HashMap<>();
        response.put("danceId",danceId);
        return new ResponseEntity<>(BaseResponse.success(response), HttpStatus.OK);
    }

    @GetMapping("/{danceId}")
    public ResponseEntity<BaseResponse> danceDetails(@ApiIgnore Authentication authentication, @PathVariable Long danceId) throws IOException {
        log.info("danceId : "+danceId);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        DanceDetailsWithRankDto danceDetailWithRankDto = danceService.findDance(userId, danceId);
        return new ResponseEntity<>(BaseResponse.success(danceDetailWithRankDto), HttpStatus.OK);
    }

    @PutMapping("/{danceId}/status")
    public ResponseEntity<BaseResponse> checkDanceStatus(@ApiIgnore Authentication authentication, @PathVariable Long danceId)
        throws YoutubeDLException, UnknownHostException {
        log.info("danceId : "+danceId);
        DanceStatusDto danceStatusDto = danceService.checkDanceStatus(danceId);
        return new ResponseEntity<>(BaseResponse.success(danceStatusDto), HttpStatus.OK);
    }

    @PutMapping("/{danceId}")
    public ResponseEntity<BaseResponse> saveResult(@ApiIgnore Authentication authentication, @PathVariable Long danceId, @RequestPart MultipartFile jsonFile) throws IOException {
        log.info("danceId : "+danceId);
        log.info("jsonFile : "+jsonFile);
        danceService.saveResult(danceId,jsonFile);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}