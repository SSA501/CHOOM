package com.choom.domain.search.controller;

import com.choom.domain.search.dto.AddSearchRequestDto;
import com.choom.domain.search.dto.SearchResponseDto;
import com.choom.domain.search.service.SearchService;
import com.choom.global.auth.CustomUserDetails;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/search")
@Slf4j
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @PostMapping()
    public ResponseEntity<BaseResponse> addSearch(@ApiIgnore Authentication authentication,
                                                  @RequestBody AddSearchRequestDto addSearchRequestDto) {
        log.info("addSearchRequestDto : " + addSearchRequestDto);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        SearchResponseDto searchResponseDto = searchService.addSearch(userId, addSearchRequestDto);
        return new ResponseEntity<>(BaseResponse.success(searchResponseDto), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<BaseResponse> searchList(@ApiIgnore Authentication authentication) {
        log.info("searchList");
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        List<SearchResponseDto> searchResponseDtoList = searchService.findSearch(userId);
        return new ResponseEntity<>(BaseResponse.success(searchResponseDtoList), HttpStatus.OK);
    }

    @DeleteMapping("/{searchId}")
    public ResponseEntity<BaseResponse> removeSearch(@ApiIgnore Authentication authentication,
                                                     @PathVariable Long searchId) {
        log.info("searchId : " + searchId);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        searchService.removeSearch(userId, searchId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}
