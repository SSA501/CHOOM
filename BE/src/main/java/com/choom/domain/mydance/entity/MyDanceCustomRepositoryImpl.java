package com.choom.domain.mydance.entity;

import com.choom.domain.dance.entity.Dance;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class MyDanceCustomRepositoryImpl implements MyDanceCustomRepository{
    private final JPAQueryFactory queryFactory;

    QMyDance myDance = QMyDance.myDance;

    @Override
    public List<MyDance> findRankingUser(Dance dance) {
        return queryFactory
            .selectFrom(myDance)
            .where(myDance.dance.eq(dance)) //dance로 조회 Dance로 조회          id로 조회할때랑 Dance로 조회할때 차이가 날까????????????
            .orderBy(myDance.score.desc()) // 오름차순으로 정렬
            .limit(3)
            .fetch();
    }
}
