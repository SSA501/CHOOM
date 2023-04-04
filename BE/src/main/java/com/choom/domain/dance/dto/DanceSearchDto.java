package com.choom.domain.dance.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class DanceSearchDto {

    Boolean isUrl;
    List<DanceDetailsDto> dbSearch;
    List<DanceDetailsDto> search;

    @Builder
    public DanceSearchDto(Boolean isUrl, List<DanceDetailsDto> dbSearch,
        List<DanceDetailsDto> search) {
        this.isUrl = isUrl;
        this.dbSearch = dbSearch;
        this.search = search;
    }
}
