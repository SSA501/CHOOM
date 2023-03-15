package com.choom.domain.mydance.entity;

import com.choom.global.common.BaseTimeEntity;
import com.choom.domain.originaldance.entity.OriginalDance;
import com.choom.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyDance extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int score;

    @Column(length = 2, nullable = false)
    private String grade;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String matchRate;

    @Column(length = 2083, nullable = false, unique = true)
    private String videoPath;

    @Column(nullable = false)
    private double videoLength;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 2083)
    private String youtubeUrl;

    @Column(length = 2083)
    private String tiktokUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORIGINALDANCE_ID")
    private OriginalDance originalDance;
}
