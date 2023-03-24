package com.choom.domain.dance.dto;


import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DanceDetailWithRankDto {
    DanceDetailDto dance;
    List<DanceRankUserDto> myDance = new ArrayList<>();

    @Builder
    public DanceDetailWithRankDto(DanceDetailDto danceDetailDto, List<DanceRankUserDto> danceRankUserDtoList) {
        this.dance = danceDetailDto;
        this.myDance = danceRankUserDtoList;
    }
}
