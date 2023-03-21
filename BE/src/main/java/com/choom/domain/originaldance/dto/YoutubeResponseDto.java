package com.choom.domain.originaldance.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class YoutubeResponseDto {
    private String title;
    private String channelName;
    private String description;
    private String url;
    private String thumbnailPath;
}
