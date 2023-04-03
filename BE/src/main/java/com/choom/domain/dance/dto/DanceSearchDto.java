package com.choom.domain.dance.dto;

import com.google.api.services.youtube.model.SearchListResponse;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class DanceSearchDto {

    String nextPageToken;
    String prevPageToken;
    Integer totalResults;
    Integer resultsPerPage;
    Boolean isUrl = true;
    List<DanceDetailsDto> dbSearch;
    List<DanceDetailsDto> search;

    public DanceSearchDto(SearchListResponse searchListResponse,
        List<DanceDetailsDto> dbDanceDetailDtoList, List<DanceDetailsDto> danceDetailDtoList) {
        this.isUrl = false;
        this.nextPageToken = searchListResponse.getNextPageToken();
        this.prevPageToken = searchListResponse.getPrevPageToken();
        this.totalResults = searchListResponse.getPageInfo().getTotalResults();
        this.resultsPerPage = searchListResponse.getPageInfo().getResultsPerPage();
        this.dbSearch = dbDanceDetailDtoList;
        this.search = danceDetailDtoList;
    }

    public DanceSearchDto(List<DanceDetailsDto> dbDanceDetailDtoList,
        List<DanceDetailsDto> danceDetailDtoList) {
        this.isUrl = true;
        this.dbSearch = dbDanceDetailDtoList;
        this.search = danceDetailDtoList;
    }
}
