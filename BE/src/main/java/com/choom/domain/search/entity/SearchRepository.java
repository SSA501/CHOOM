package com.choom.domain.search.entity;

import com.choom.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository extends JpaRepository<Search, Long> {
    List<Search> findTop8ByUserOrderByCreatedAtDesc(User user);
}