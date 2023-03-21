package com.choom.domain.originaldance.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OriginalDanceRepository extends JpaRepository<OriginalDance, Long> {

}
