package com.choom.domain.mydance.entity;

import com.choom.domain.dance.entity.Dance;
import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.entity.User;

import com.querydsl.core.Tuple;
import java.util.List;

public interface MyDanceCustomRepository {
    List<Tuple> findRankingUser(Dance dance);

    UserMyDanceDto findMyDanceInfoByUser(User user);
}
