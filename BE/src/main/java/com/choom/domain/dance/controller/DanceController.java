package com.choom.domain.dance.controller;

import com.choom.domain.dance.dto.DanceDetailWithRankDto;
import com.choom.domain.dance.dto.DanceDetailDto;
import com.choom.domain.dance.service.DanceService;
import com.choom.global.model.BaseResponse;
import java.io.IOException;
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
        List<DanceDetailDto> danceDetailDtoList = danceService.searchDance(keyword);
        return new ResponseEntity<>(BaseResponse.success(danceDetailDtoList), HttpStatus.OK);
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<BaseResponse> danceDetails(@PathVariable String videoId) throws IOException {
        log.info("videoId : "+videoId);
        DanceDetailWithRankDto danceDetailWithRankDto = danceService.findDance(videoId);
        return new ResponseEntity<>(BaseResponse.success(danceDetailWithRankDto), HttpStatus.OK);
    }

    @PutMapping("/{danceId}")
    public ResponseEntity<BaseResponse> addCoordinate(@PathVariable Long danceId, @RequestPart MultipartFile jsonFile) throws IOException {
        log.info("danceId : "+danceId);
        log.info("jsonFile : "+jsonFile);
        danceService.addCoordinate(danceId,jsonFile);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}