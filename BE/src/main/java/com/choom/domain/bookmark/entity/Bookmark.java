package com.choom.domain.bookmark.entity;

import com.choom.global.model.BaseTimeEntity;

import javax.persistence.*;

import com.choom.domain.dance.entity.Dance;
import com.choom.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bookmark extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DANCE_ID")
    private Dance dance;

    @Builder
    public Bookmark(User user, Dance dance) {
        this.user = user;
        this.dance = dance;
    }
}
