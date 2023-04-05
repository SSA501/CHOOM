package com.choom.domain.mydance.entity;

import com.choom.domain.dance.entity.Dance;
import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.entity.User;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import static com.querydsl.core.group.GroupBy.max;

import java.util.List;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class MyDanceCustomRepositoryImpl implements MyDanceCustomRepository {
    private final JPAQueryFactory queryFactory;

    QMyDance myDance = QMyDance.myDance;

    @Override
    public List<Tuple> findRankingUser(Dance dance) {
        return queryFactory
            .select(myDance.user, myDance.score.max().as("max_score"))
            .from(myDance)
            .where(myDance.dance.eq(dance))
            .groupBy(myDance.user)
            .orderBy(myDance.score.max().desc())
            .limit(3)
            .fetch();
    }

    @Override
    public UserMyDanceDto findMyDanceInfoByUser(User user) {
        UserMyDanceDto userMyDanceDto = queryFactory
                .select(Projections.constructor(UserMyDanceDto.class, myDance.count(), myDance.videoLength.sum(), myDance.score.avg().intValue()))
                .from(myDance)
                .where(myDance.user.eq(user))
                .fetchOne();
        return userMyDanceDto;
    }
}
