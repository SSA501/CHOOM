import React from "react";
import ChallengeDetail from "../../components/ChallengeDetail/ChallengeDetail";
import { ShadowContainer } from "../../components/ShadowContainer/style";
import { DetailContainer, DetailPageContainer } from "./style";

function DetailPage() {
  const videoData = {
    id: 1,
    videoPath:
      "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
    thumbnailSrc:
      "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    title: "하입보이",
    url: "https://youtu.be/videoId",
    userCount: 2,
    status: 2,
  };

  return (
    <DetailPageContainer>
      <div>
        <iframe
          src={videoData.videoPath}
          title={videoData.title}
          width="360px"
          height="640px"
        />
      </div>
      {/* TODO : DB 비디오 주소로 변경 */}
      {/* <video
            src={videoPath}
            autoPlay
            controls
            width="360px"
            height="640px"
          /> */}
      <DetailContainer>
        <ChallengeDetail />
        <ChallengeDetail />
      </DetailContainer>
    </DetailPageContainer>
  );
}

export default DetailPage;
