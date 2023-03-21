package com.choom.domain.originaldance.service;

import com.choom.domain.originaldance.dto.YoutubeResponseDto;
import java.util.List;

public interface OriginalDanceService {

    List<YoutubeResponseDto> searchChallenge(String keyword, int page);
}
