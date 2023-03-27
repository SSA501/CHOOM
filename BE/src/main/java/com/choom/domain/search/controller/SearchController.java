package com.choom.domain.search.controller;

import com.choom.domain.search.dto.AddSearchRequestDto;
import com.choom.domain.search.dto.SearchResponseDto;
import com.choom.domain.search.service.SearchService;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@Slf4j
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @PostMapping()
    public ResponseEntity<BaseResponse> addSearch(@RequestBody AddSearchRequestDto addSearchRequestDto) {
        log.info("addSearchRequestDto : " + addSearchRequestDto);
        SearchResponseDto searchResponseDto = searchService.addSearch(addSearchRequestDto);
        return new ResponseEntity<>(BaseResponse.success(searchResponseDto), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<BaseResponse> searchList() {
        log.info("searchList");
        List<SearchResponseDto> searchResponseDtoList = searchService.findSearch();
        return new ResponseEntity<>(BaseResponse.success(searchResponseDtoList), HttpStatus.OK);
    }

    @DeleteMapping("/{searchId}")
    public ResponseEntity<BaseResponse> removeSearch(@PathVariable Long searchId) {
        log.info("searchId : " + searchId);
        searchService.removeSearch(searchId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}
