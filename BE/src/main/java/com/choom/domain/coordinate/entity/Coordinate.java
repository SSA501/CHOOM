package com.choom.domain.coordinate.entity;

import com.choom.global.common.BaseTimeEntity;

import javax.persistence.*;

import com.choom.domain.originaldance.entity.OriginalDance;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Coordinate extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    String result;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "coordinate", cascade = CascadeType.ALL)
    private OriginalDance originalDance;
}
