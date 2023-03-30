package com.choom.domain.dance.entity;

import com.choom.domain.bookmark.entity.Bookmark;
import com.choom.domain.dance.dto.DanceDetailsDto;
import com.choom.global.model.BaseTimeEntity;
import com.choom.domain.mydance.entity.MyDance;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@DynamicInsert
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dance extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 100)
    private String title;

    @NotNull
    @Column(length = 2083, unique = true)
    private String url;

    @NotNull
    @Column(length = 30, unique = true)
    private String youtubeId;

    @Column(length = 2083, unique = true)
    private String videoPath;

    @Column(length = 2083, unique = true)
    private String jsonPath;

    @Column(length = 2083, unique = true)
    private String thumbnailPath;

    @NotNull
    @Column
    @ColumnDefault("0")
    private int userCount;

    @NotNull
    @Column
    @ColumnDefault("0")
    private int status;

    @OneToMany(mappedBy = "dance", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "dance", cascade = CascadeType.ALL)
    private List<MyDance> myDanceList = new ArrayList<>();

    public void updateJsonPath(String jsonPath) {
        this.jsonPath = jsonPath;
    }

    public void changeStatus(int status){
        this.status = status;
    }

    public void saveVideoPath(String videoPath){
        this.videoPath = videoPath;
    }

    public int getBookmarkSize(){
        return bookmarkList.size();
    }

    @Builder
    public Dance(Long id, String videoPath, String jsonPath,
        List<Bookmark> bookmarkList,
        List<MyDance> myDanceList, DanceDetailsDto danceDetailDto) {
        this.id = id;
        this.title = danceDetailDto.getTitle();
        this.url = danceDetailDto.getUrl();
        this.videoPath = videoPath;
        this.jsonPath = jsonPath;
        this.thumbnailPath = danceDetailDto.getThumbnailPath();
        this.userCount = danceDetailDto.getUserCount();
        this.status = danceDetailDto.getStatus();
        this.youtubeId = danceDetailDto.getYoutubeId();
        this.bookmarkList = bookmarkList;
        this.myDanceList = myDanceList;
    }
}