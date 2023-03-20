package com.choom.domain.mydance.service;

import org.json.simple.parser.ParseException;

public interface MyDanceService {

    // 일치율을 계산하는 함수
    String calculateSimilarity(Long originalDanceId, String myDanceCoordinate) throws ParseException;

}
