import React from "react";
import Video from "../../components/Video/Video";

function MainPage() {
  const videoData = [
    {
      id: 1,
      videoSrc: "https://www.youtube.com/shorts/fYQxthUKung",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
  ];
  return (
    <div>
      메인페이지
      {videoData.map(({ id, videoSrc, thumbnailSrc }) => (
        <Video id={id} videoSrc={videoSrc} thumbnailSrc={thumbnailSrc} />
      ))}
    </div>
  );
}

export default MainPage;
