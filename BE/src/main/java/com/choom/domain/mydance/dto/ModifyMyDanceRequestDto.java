package com.choom.domain.mydance.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ModifyMyDanceRequestDto {
    private String title;

    @Builder
    public ModifyMyDanceRequestDto(String title) {
        this.title = title;
    }
}