import React, { useState } from "react";
import ReactPlayer from "react-player";
import { VideoContainer } from "./style";

interface VideoProps {
  id: number;
  videoSrc: string;
  thumbnailSrc: string;
  playbackRate?: number; // 유튜브만 적용됨, 틱톡은 따로 코드 추가해야함
  volume?: number;
  bgFrame?: string; // 테두리 색상, 적용안하면 비디오만 표시
}

function Video({
  id,
  thumbnailSrc,
  videoSrc,
  playbackRate,
  volume,
  bgFrame,
}: VideoProps) {
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  return (
    <VideoContainer
      key={videoSrc}
      onMouseEnter={(): void => setPlayingVideoId(id)}
      onMouseLeave={(): void => setPlayingVideoId(null)}
      bgFrame={bgFrame}
    >
      {playingVideoId === id ? (
        <ReactPlayer
          url={videoSrc}
          playing={playingVideoId === id}
          controls={true}
          muted={true}
          playbackRate={playbackRate}
          volume={volume}
          loop={true}
          width="100%"
          height="100%"
          key={id}
          tabIndex={-1}
        />
      ) : (
        <img src={thumbnailSrc} alt="썸네일이미지" width="100%" height="100%" />
      )}
    </VideoContainer>
  );
}

export default Video;
