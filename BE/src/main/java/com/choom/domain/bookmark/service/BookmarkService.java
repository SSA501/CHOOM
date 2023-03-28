package com.choom.domain.bookmark.service;

import com.choom.domain.bookmark.entity.Bookmark;
import com.choom.domain.bookmark.entity.BookmarkRepository;
import com.choom.domain.dance.entity.Dance;
import com.choom.domain.dance.entity.DanceRepository;
import com.choom.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final DanceRepository danceRepository;

    @Transactional
    public void addBookmark(User user, Long danceId) {
        Optional<Bookmark> bookmark = bookmarkRepository.findBookmarkByUserIdAndDanceId(user.getId(), danceId);
        log.info("bookmark : " + bookmark);
        if (bookmark.isEmpty()) {
            Dance dance = danceRepository.findById(danceId)
                    .orElseThrow(() -> new IllegalArgumentException("챌린지를 찾을 수 없습니다"));
            Bookmark newBookmark = Bookmark.builder()
                    .user(user)
                    .dance(dance)
                    .build();
            bookmarkRepository.save(newBookmark);
        }
        return;
    }
}