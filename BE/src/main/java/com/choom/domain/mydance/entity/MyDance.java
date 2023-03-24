package com.choom.domain.mydance.entity;

import com.choom.domain.dance.entity.Dance;
import com.choom.global.model.BaseTimeEntity;
import com.choom.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyDance extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private int score;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String matchRate;

    @NotNull
    @Column(length = 2083, unique = true)
    private String videoPath;

    @NotNull
    @Column
    private int videoLength;

    @NotNull
    @Column(length = 100)
    private String title;

    @Column(length = 2083)
    private String youtubeUrl;

    @Column(length = 2083)
    private String tiktokUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DANCE_ID")
    private Dance dance;

    @Builder
    public MyDance(int score, String matchRate, String videoPath, int videoLength, String title, User user, Dance dance, String tiktokUrl, String youtubeUrl) {
        this.score = score;
        this.matchRate = matchRate;
        this.videoPath = videoPath;
        this.videoLength = videoLength;
        this.title = title;
        this.user = user;
        this.dance = dance;
        this.tiktokUrl = tiktokUrl;
        this.youtubeUrl = youtubeUrl;
    }
}
