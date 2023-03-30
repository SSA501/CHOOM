package com.choom.domain.bookmark.service;

import com.choom.domain.bookmark.dto.BookmarkDetailsDto;
import com.choom.domain.bookmark.entity.Bookmark;
import com.choom.domain.bookmark.entity.BookmarkRepository;
import com.choom.domain.dance.entity.Dance;
import com.choom.domain.dance.entity.DanceRepository;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final DanceRepository danceRepository;
    private final UserRepository userRepository;

    public Page<BookmarkDetailsDto> findBookmarks(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        Page<Bookmark> bookmarkPage = bookmarkRepository.findPageByUser(user, pageable);
        return bookmarkPage.map(bookmark -> BookmarkDetailsDto.builder()
                .bookmark(bookmark)
                .build());
    }

    @Transactional
    public void addBookmark(Long userId, Long danceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndDanceId(user.getId(), danceId).orElse(null);
        log.info("bookmark : " + bookmark);
        if (bookmark == null) {
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

    @Transactional
    public void removeBookmark(Long userId, Long danceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        Bookmark bookmark = bookmarkRepository.findBookmarkByUserIdAndDanceId(user.getId(), danceId).orElse(null);
        log.info("bookmark : " + bookmark);
        if (bookmark != null) {
            bookmarkRepository.delete(bookmark);
        }
        return;
    }
}