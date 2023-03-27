import React from "react";
import Video from "../Video/Video";
import { VideoListContainer, VideoItem } from "./style";

type VideoListProps = {
  listOption: string;
  videoList: any;
};

function VideoList(props: VideoListProps) {
  // 80~100 green, 60~79 purple, 40~59 blue, 0~39 skyblue
  const videoItemList = props.videoList.map((item: any) => (
    <VideoItem
      bgColor={
        item.score >= 80
          ? "green"
          : item.score >= 60
          ? "purple"
          : item.score >= 40
          ? "blue"
          : "skyblue"
      }
    >
      <Video
        id={item.id}
        title={item.title}
        videoPath={item.videoPath}
        thumbnailSrc={item.thumbnailSrc}
        handleClickVideo={() => {}}
      />
      <div>{item.score}</div>
    </VideoItem>
  ));

  return (
    <>
      {props.listOption === "History" && (
        <VideoListContainer>{videoItemList}</VideoListContainer>
      )}
      {props.listOption === "Likes" && (
        <VideoListContainer>{videoItemList}</VideoListContainer>
      )}
    </>
  );
}

export default VideoList;
