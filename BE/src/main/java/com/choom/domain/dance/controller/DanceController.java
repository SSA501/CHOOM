package com.choom.domain.dance.controller;

import com.choom.domain.dance.dto.DanceDetailsWithRankDto;
import com.choom.domain.dance.dto.DanceDetailsDto;
import com.choom.domain.dance.dto.PopularDanceDto;
import com.choom.domain.dance.dto.DanceStatusDto;
import com.choom.domain.dance.service.DanceService;
import com.choom.global.model.BaseResponse;
import com.sapher.youtubedl.YoutubeDLException;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/dance")
@Slf4j
@RequiredArgsConstructor
public class DanceController {

    private final DanceService danceService;

    @GetMapping()
    public ResponseEntity<BaseResponse> searchDance(@RequestParam(name = "q") String keyword){
        log.info("keyword : "+keyword);
        List<DanceDetailsDto> danceDetailDtoList = danceService.searchDance(keyword);
        return new ResponseEntity<>(BaseResponse.success(danceDetailDtoList), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<BaseResponse> popularDance() {
        log.info("start popularDance");
        List<PopularDanceDto> popularDanceDtoList = danceService.findPopularDance();
        return new ResponseEntity<>(BaseResponse.success(popularDanceDtoList), HttpStatus.OK);
    }

    @GetMapping("/{youtubeId}")
    public ResponseEntity<BaseResponse> danceDetails(@PathVariable String youtubeId) throws IOException {
        log.info("youtubeId : "+youtubeId);
        Long userId = 1L;
        DanceDetailsWithRankDto danceDetailWithRankDto = danceService.findDance(userId, youtubeId);
        return new ResponseEntity<>(BaseResponse.success(danceDetailWithRankDto), HttpStatus.OK);
    }

    @PutMapping("/{danceId}/status")
    public ResponseEntity<BaseResponse> checkDanceStatus(@PathVariable Long danceId)
        throws YoutubeDLException, UnknownHostException {
        log.info("danceId : "+danceId);
        DanceStatusDto danceStatusDto = danceService.checkDanceStatus(danceId);
        return new ResponseEntity<>(BaseResponse.success(danceStatusDto), HttpStatus.OK);
    }

    @PutMapping("/{danceId}")
    public ResponseEntity<BaseResponse> saveResult(@PathVariable Long danceId, @RequestPart MultipartFile jsonFile) throws IOException {
        log.info("danceId : "+danceId);
        log.info("jsonFile : "+jsonFile);
        danceService.saveResult(danceId,jsonFile);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}