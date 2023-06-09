package com.choom.domain.search.entity;

import com.choom.global.model.BaseTimeEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.choom.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Search extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 2083)
    private String keyword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Builder
    public Search(String keyword, User user) {
        this.keyword = keyword;
        this.user = user;
    }
}
