import React, { useState } from "react";
import { ReactPlayerStyled, ThumbnailImg, VideoContainer } from "./style";

interface VideoProps {
  id: number;
  videoSrc: string;
  thumbnailSrc: string;
  playbackRate?: number; // 유튜브만 적용됨, 틱톡은 따로 코드 추가해야함
  volume?: number;
  bgFrame?: string; // 테두리 색상, 적용안하면 비디오만 표시
}

/**
 * 우리 서버에서 주는 url로는 ReactPlayer 안될수도 있음
 */

function Video({
  id,
  thumbnailSrc,
  videoSrc,
  playbackRate,
  volume,
  bgFrame,
}: VideoProps) {
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const initial = 333;
  const borderSize = 12;
  const width = bgFrame ? initial + borderSize * 2 : initial; // Replace with the actual width of your element
  const height = bgFrame ? initial * 1.7 + borderSize * 2 : initial * 1.7; // Replace with the actual height of your element
  const ratio = (height / width) * 100;

  return (
    <VideoContainer
      key={id}
      onMouseEnter={(): void => setPlayingVideoId(id)}
      onMouseLeave={(): void => setPlayingVideoId(null)}
      bgFrame={bgFrame}
      ratio={ratio}
    >
      {playingVideoId === id ? (
        <ReactPlayerStyled
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
        // <iframe src={videoSrc} title={videoSrc} />
        <ThumbnailImg
          src={thumbnailSrc}
          alt="썸네일이미지"
          width="100%"
          height="100%"
        />
      )}
    </VideoContainer>
  );
}

export default Video;
