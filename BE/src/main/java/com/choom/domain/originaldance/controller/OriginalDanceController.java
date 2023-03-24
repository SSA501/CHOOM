package com.choom.domain.originaldance.controller;

import com.choom.domain.originaldance.dto.DetailChallengeDto;
import com.choom.domain.originaldance.dto.SearchResponseDto;
import com.choom.domain.originaldance.service.OriginalDanceService;
import com.choom.global.model.BaseResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/dance")
@Slf4j
@RequiredArgsConstructor
public class OriginalDanceController {

    private final OriginalDanceService originalDanceService;

    @GetMapping()
    public ResponseEntity<BaseResponse> searchDance(@RequestParam(name = "q") String keyword){
        log.info("keyword : "+keyword);
        List<SearchResponseDto> searchResponseDtoList = originalDanceService.searchDance(keyword);
        return new ResponseEntity<>(BaseResponse.success(searchResponseDtoList), HttpStatus.OK);
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<BaseResponse> danceDetails(@PathVariable String videoId)
        throws IOException {
        log.info("videoId : "+videoId);
        DetailChallengeDto detailChallengeDto = originalDanceService.findDance(videoId);
        return new ResponseEntity<>(BaseResponse.success(detailChallengeDto), HttpStatus.OK);
    }

    @PutMapping("/{originalDanceId}")
    public ResponseEntity<BaseResponse> addCoordinate(@PathVariable Long originalDanceId, @RequestPart MultipartFile jsonFile) throws IOException {
        log.info("originalDanceId : "+originalDanceId);
        log.info("jsonFile : "+jsonFile);
        originalDanceService.addCoordinate(originalDanceId,jsonFile);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}