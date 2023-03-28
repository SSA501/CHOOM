package com.choom.domain.mydance.entity;

import com.choom.domain.dance.entity.Dance;
import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.entity.User;

import java.util.List;

public interface MyDanceCustomRepository {
    List<MyDance> findRankingUser(Dance dance);

    UserMyDanceDto findMyDanceInfoByUser(User user);
}
