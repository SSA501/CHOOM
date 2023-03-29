package com.choom.domain.bookmark.dto;

import com.choom.domain.bookmark.entity.Bookmark;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookmarkDetailsDto {
    private Long id;
    private Long danceId;
    private String title;
    private String url;
    private String videoPath;
    private int userCount;
    private int status;
    private String createdAt;

    @Builder
    public BookmarkDetailsDto(Bookmark bookmark) {
        this.id = bookmark.getId();
        this.danceId = bookmark.getDance().getId();
        this.title = bookmark.getDance().getTitle();
        this.url = bookmark.getDance().getUrl();
        this.videoPath = bookmark.getDance().getVideoPath();
        this.userCount = bookmark.getDance().getUserCount();
        this.status = bookmark.getDance().getStatus();
        this.createdAt = bookmark.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
    }
}