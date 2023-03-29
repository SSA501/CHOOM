import React, { useState } from "react";
import { BtnDetail, ThumbnailImg, VideoContainer } from "./style";

interface VideoProps {
  videoPath: string;
  thumbnailPath: string;
  title: string;
  handleClickVideo: () => void;
}

function Video({ thumbnailPath, videoPath, handleClickVideo }: VideoProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string>("");

  return (
    <VideoContainer
      key={videoPath}
      onMouseEnter={(): void => setPlayingVideoId(videoPath)}
      onMouseLeave={(): void => setPlayingVideoId("")}
    >
      {playingVideoId === videoPath ? (
        <>
          <video
            src={videoPath}
            autoPlay
            controls
            width="270px"
            height="480px"
            controlsList="nodownload"
          />
          <BtnDetail btnText="상세보기" handleClick={handleClickVideo} />
        </>
      ) : (
        <ThumbnailImg
          src={thumbnailPath}
          alt="썸네일이미지"
          width="270px"
          height="480px"
        />
      )}
    </VideoContainer>
  );
}

export default Video;
