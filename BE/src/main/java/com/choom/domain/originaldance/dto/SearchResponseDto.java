package com.choom.domain.originaldance.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchResponseDto {
    private String title;
    private String channelName;
    private String description;
    private String url;
    private String thumbnailPath;
    private int sec;
    private Long likeCount;
    private Long viewCount;
    private int userCount;

    @Builder
    public SearchResponseDto(String title, int sec, String channelName, String description, String url,  String thumbnailPath, Long likeCount, Long viewCount, int userCount) {
        this.url = url;
        this.title = title;
        this.channelName = channelName;
        this.description = description;
        this.thumbnailPath = thumbnailPath;
        this.sec = sec;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.userCount = userCount;
    }
}
