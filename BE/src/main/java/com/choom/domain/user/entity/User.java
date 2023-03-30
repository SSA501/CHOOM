package com.choom.domain.user.entity;

import com.choom.domain.bookmark.entity.Bookmark;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.search.entity.Search;
import com.choom.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 200)
    private String identifier;

    @NotNull
    @Column(length = 10)
    private String nickname;

    @NotNull
    @Column(length = 2083)
    private String profileImage;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<MyDance> myDanceList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Search> searchList = new ArrayList<>();

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    @Builder
    public User(String identifier, String nickname, String profileImage, SocialType socialType) {
        this.identifier = identifier;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.socialType = socialType;
    }
}