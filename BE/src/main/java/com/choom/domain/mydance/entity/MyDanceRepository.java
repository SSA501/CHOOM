package com.choom.domain.mydance.entity;

import com.choom.domain.user.dto.UserMyDanceDto;
import com.choom.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyDanceRepository extends JpaRepository<MyDance, Long>, MyDanceCustomRepository{
    Page<MyDance> findPageByUser(User user, Pageable pageable);

    UserMyDanceDto findMyDanceInfoByUser(User user);
}