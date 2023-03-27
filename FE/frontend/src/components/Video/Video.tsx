import React, { useState } from "react";
import { BtnDetail, VideoContainer } from "./style";

interface VideoProps {
  id: number;
  videoPath: string;
  thumbnailSrc: string;
  title: string;
  handleClickVideo: () => void;
}

function Video({ id, thumbnailSrc, videoPath, handleClickVideo }: VideoProps) {
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  return (
    <VideoContainer
      key={id}
      onMouseEnter={(): void => setPlayingVideoId(id)}
      onMouseLeave={(): void => setPlayingVideoId(null)}
    >
      {playingVideoId === id ? (
        <>
          <iframe
            src={videoPath}
            title={videoPath}
            width="270px"
            height="480px"
          />
          {/* TODO : DB 비디오 주소로 변경 */}
          {/* <video
            src={videoPath}
            autoPlay
            controls
            width="270px"
            height="480px"
          /> */}
          <BtnDetail btnText="상세보기" handleClick={handleClickVideo} />
        </>
      ) : (
        <img src={thumbnailSrc} alt="썸네일이미지" width="100%" height="100%" />
      )}
    </VideoContainer>
  );
}

export default Video;
