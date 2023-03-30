import React, { useState } from "react";
import ReactPlayer from "react-player";
import { BtnDetail, ThumbnailImg, VideoContainer } from "./style";

interface VideoProps {
  id: number | null;
  url?: string;
  videoPath: string;
  thumbnailPath: string;
  title: string;
  handleClickVideo: () => void;
}

function Video({
  id,
  url,
  thumbnailPath,
  videoPath,
  handleClickVideo,
}: VideoProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string>("");

  return (
    <VideoContainer
      key={videoPath}
      onMouseEnter={(): void => setPlayingVideoId(videoPath)}
      onMouseLeave={(): void => setPlayingVideoId("")}
    >
      {playingVideoId === videoPath ? (
        <>
          {id ? (
            <video
              src={videoPath}
              autoPlay
              controls
              width="270px"
              height="480px"
              controlsList="nodownload"
            />
          ) : (
            <ReactPlayer
              url={url}
              width="270px"
              height="480px"
              controls
              loop
              muted
              playing
            />
          )}

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
