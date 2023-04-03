package com.choom.domain.dance.entity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DanceCustomRepositoryImpl implements DanceCustomRepository {

    private final JPAQueryFactory queryFactory;

    QDance dance = QDance.dance;

    @Override
    public List<Dance> findPopularDance() {
        return queryFactory
            .selectFrom(dance)
            .orderBy(dance.userCount.desc())
            .limit(3)
            .fetch();
    }
}
