package com.choom.domain.search.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchResponseDto {
    private Long searchId;
    private String keyword;

    @Builder
    public SearchResponseDto(Long searchId, String keyword) {
        this.searchId = searchId;
        this.keyword = keyword;
    }
}