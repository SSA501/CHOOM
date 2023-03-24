package com.choom.domain.mydance.entity;

import com.choom.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyDanceRepository extends JpaRepository<MyDance, Long> {
    Page<MyDance> findPageByUser(User user, Pageable pageable);
}