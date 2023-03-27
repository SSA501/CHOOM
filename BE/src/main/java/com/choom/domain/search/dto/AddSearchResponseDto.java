package com.choom.domain.search.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AddSearchResponseDto {
    private Long searchId;

    @Builder
    public AddSearchResponseDto(Long searchId) {
        this.searchId = searchId;
    }
}