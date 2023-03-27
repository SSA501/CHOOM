package com.choom.domain.search.service;

import com.choom.domain.search.dto.AddSearchRequestDto;
import com.choom.domain.search.dto.AddSearchResponseDto;
import com.choom.domain.search.entity.Search;
import com.choom.domain.search.entity.SearchRepository;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import com.choom.global.exception.SearchKeywordException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class SearchService {

    private final UserRepository userRepository;
    private final SearchRepository searchRepository;

    @Transactional
    public AddSearchResponseDto addSearch(AddSearchRequestDto addSearchRequestDto) {
        String keyword = addSearchRequestDto.getKeyword();

        // 검색 키워드가 url일 때는 예외 처리
        String[] checkList = {
                "https://", "http://", "youtube.com", "youtu.be", "tiktok.com"
        };
        for (String check : checkList) {
            if (keyword.contains(check)) {
                throw new SearchKeywordException("잘못된 검색어입니다");
            }
        }

        // user 더미데이터
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Search search = Search.builder()
                .keyword(addSearchRequestDto.getKeyword())
                .user(user)
                .build();
        Search insertResult = searchRepository.save(search);

        return AddSearchResponseDto.builder()
                .searchId(insertResult.getId())
                .build();
    }
}