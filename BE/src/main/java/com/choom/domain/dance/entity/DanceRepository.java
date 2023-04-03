package com.choom.domain.dance.entity;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanceRepository extends JpaRepository<Dance, Long>, DanceCustomRepository {

    Optional<Dance> findByUrl(String url);

    Optional<Dance> findById(Long id);

    Optional<Dance> findByYoutubeId(String youtubeId);
}
