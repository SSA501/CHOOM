package com.choom.domain.search.dto;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AddSearchRequestDto {
    private String keyword;
}