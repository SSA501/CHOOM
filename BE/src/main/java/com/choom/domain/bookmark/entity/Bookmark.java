package com.choom.domain.bookmark.entity;

import com.choom.domain.common.BaseTimeEntity;

import javax.persistence.*;

import com.choom.domain.originaldance.entity.OriginalDance;
import com.choom.domain.user.entity.User;
import lombok.AccessLevel;
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
    @JoinColumn(name = "ORIGINALDANCE_ID")
    private OriginalDance originalDance;
}
