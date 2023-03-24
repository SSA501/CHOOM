package com.choom.domain.originaldance.dto;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DetailChallengeDto {
    SearchResponseDto originalDance;

    @Builder
    public DetailChallengeDto(SearchResponseDto searchResponseDto) {
        this.originalDance = searchResponseDto;
    }
}
