package com.choom.domain.bookmark.entity;

import com.choom.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findBookmarkByUserIdAndDanceId(Long userId, Long danceId);

    Page<Bookmark> findPageByUser(User user, Pageable pageable);

}
