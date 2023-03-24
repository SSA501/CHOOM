package com.choom.domain.dance.dto;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DetailChallengeDto {
    SearchResponseDto dance;

    @Builder
    public DetailChallengeDto(SearchResponseDto searchResponseDto) {
        this.dance = searchResponseDto;
    }
}
