package com.choom.domain.mydance.entity;

import com.choom.domain.dance.dto.DanceRankUserDto;
import com.choom.domain.dance.entity.Dance;
import java.util.List;

public interface MyDanceCustomRepository {
    List<MyDance> findRankingUser(Dance dance);
}
