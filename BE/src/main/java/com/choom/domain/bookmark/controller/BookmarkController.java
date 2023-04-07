package com.choom.domain.bookmark.controller;

import com.choom.domain.bookmark.dto.BookmarkDetailsDto;
import com.choom.domain.bookmark.service.BookmarkService;
import com.choom.global.auth.CustomUserDetails;
import com.choom.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@RestController
@RequestMapping("/bookmark")
@Slf4j
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping()
    public ResponseEntity<BaseResponse> bookmarkList(Pageable pageable, @ApiIgnore Authentication authentication) {
        log.info("pageable : " + pageable);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        Page<BookmarkDetailsDto> bookmarkDetailsDtoList = bookmarkService.findBookmarks(userId, pageable);
        return new ResponseEntity<>(BaseResponse.success(bookmarkDetailsDtoList), HttpStatus.OK);
    }

    @PostMapping("/{danceId}")
    public ResponseEntity<BaseResponse> addBookmark(@PathVariable Long danceId, @ApiIgnore Authentication authentication) throws IOException {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        bookmarkService.addBookmark(userId, danceId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }

    @DeleteMapping("/{danceId}")
    public ResponseEntity<BaseResponse> removeBookmark(@PathVariable Long danceId, @ApiIgnore Authentication authentication) throws IOException {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = customUserDetails.getUserId();
        bookmarkService.removeBookmark(userId, danceId);
        return new ResponseEntity<>(BaseResponse.success(null), HttpStatus.OK);
    }
}
