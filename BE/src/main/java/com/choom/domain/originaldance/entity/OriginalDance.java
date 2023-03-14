package com.choom.domain.originaldance.entity;

import com.choom.domain.common.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
}