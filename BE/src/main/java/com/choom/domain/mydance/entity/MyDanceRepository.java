package com.choom.domain.mydance.entity;

import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.entity.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MyDanceRepository extends JpaRepository<MyDance, Long>, MyDanceCustomRepository {
    Page<MyDance> findPageByUser(User user, Pageable pageable);

    UserMyDanceDto findMyDanceInfoByUser(User user);

    Optional<MyDance> findByIdAndUser(Long myDanceId, User user);

    List<MyDance> findByScoreAndUser(int score, User user);
}