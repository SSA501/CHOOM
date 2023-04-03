package com.choom.domain.dance.entity;

import java.util.List;

public interface DanceCustomRepository {

    List<Dance> findPopularDance();
}
