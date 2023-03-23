package com.choom.domain.mydance.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyDanceRepository extends JpaRepository<MyDance, Long> {
}