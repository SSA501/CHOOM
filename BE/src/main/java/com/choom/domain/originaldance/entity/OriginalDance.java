package com.choom.domain.originaldance.entity;

import com.choom.domain.bookmark.entity.Bookmark;
import com.choom.domain.common.BaseTimeEntity;
import com.choom.domain.coordinate.entity.Coordinate;
import com.choom.domain.mydance.entity.MyDance;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OriginalDance extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 2083, nullable = false, unique = true)
    private String url;

    @Column(length = 2083, unique = true)
    private String videoPath;

    @Column(nullable = false)
    private int userCount;

    @Column(nullable = false)
    private int status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COORDINATE_ID", unique = true)
    private Coordinate coordinate;

    @OneToMany(mappedBy = "originalDance", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "originalDance", cascade = CascadeType.ALL)
    private List<MyDance> myDanceList = new ArrayList<>();
}