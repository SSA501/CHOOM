import React, { useState } from "react";
import { VideoContainer } from "./style";

interface VideoProps {
  id: number;
  videoSrc: string;
  thumbnailSrc: string;
  playbackRate?: number; // 유튜브만 적용됨, 틱톡은 따로 코드 추가해야함
  volume?: number;
  frameColor?: string; // 테두리 색상, 적용안하면 비디오만 표시
}

/**
 * 우리 서버에서 주는 url로는 ReactPlayer 안될수도 있음
 */

function Video({ id, thumbnailSrc, videoSrc, frameColor }: VideoProps) {
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  // const initial = 300;
  // const borderSize = 14;
  // const width = frameColor ? initial + borderSize * 2 : initial;
  // const height = frameColor ? initial * 1.7 + borderSize * 2 : initial * 1.7;
  const width = 450;
  const height = 800;
  const ratio = (height / width) * 100;

  return (
    <VideoContainer
      key={id}
      onMouseEnter={(): void => setPlayingVideoId(id)}
      onMouseLeave={(): void => setPlayingVideoId(null)}
      frameColor={frameColor}
      ratio={ratio}
    >
      {playingVideoId === id ? (
        // <ReactPlayerStyled
        //   url={videoSrc}
        //   playing={playingVideoId === id}
        //   controls={true}
        //   muted={true}
        //   loop={true}
        //   width="100%"
        //   height="100%"
        //   key={id}
        //   tabIndex={-1}
        // />
        <iframe src={videoSrc} title={videoSrc} width="450px" height="800px" />
      ) : (
        <img src={thumbnailSrc} alt="썸네일이미지" width="100%" height="100%" />
      )}
    </VideoContainer>
  );
}

export default Video;