package com.choom.domain.search.controller;

import com.choom.domain.search.dto.AddSearchRequestDto;
import com.choom.domain.search.dto.AddSearchResponseDto;
import com.choom.domain.search.service.SearchService;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@Slf4j
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @PostMapping()
    public ResponseEntity<BaseResponse> addSearch(@RequestBody AddSearchRequestDto addSearchRequestDto) {
        log.info("addSearchRequestDto : " + addSearchRequestDto);
        AddSearchResponseDto addSearchResponseDto = searchService.addSearch(addSearchRequestDto);
        return new ResponseEntity<>(BaseResponse.success(addSearchResponseDto), HttpStatus.OK);
    }
}
