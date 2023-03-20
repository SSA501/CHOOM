import React from "react";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";

export interface videoData {
  id: number;
  videoSrc: string;
  thumbnailSrc: string;
}

function MainPage() {
  const videoData: videoData[] = [
    {
      id: 1,
      videoSrc: "https://www.youtube.com/shorts/fYQxthUKung",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
    {
      id: 2,
      videoSrc: "https://www.youtube.com/shorts/8P7BoKIcEMM",
      thumbnailSrc:
        "https://i.ytimg.com/vi/8P7BoKIcEMM/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAkOrwDKfR9IJ-Eg3-wu_Gc0IOSbw",
    },
    {
      id: 3,
      videoSrc: "https://www.youtube.com/shorts/fYQxthUKung",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
    {
      id: 4,
      videoSrc: "https://www.youtube.com/shorts/8P7BoKIcEMM",
      thumbnailSrc:
        "https://i.ytimg.com/vi/8P7BoKIcEMM/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAkOrwDKfR9IJ-Eg3-wu_Gc0IOSbw",
    },
    {
      id: 5,
      videoSrc: "https://www.youtube.com/shorts/8P7BoKIcEMM",
      thumbnailSrc:
        "https://i.ytimg.com/vi/8P7BoKIcEMM/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAkOrwDKfR9IJ-Eg3-wu_Gc0IOSbw",
    },
  ];

  return (
    <>
      <VideoCarousel videoData={videoData} />
    </>
  );
}

export default MainPage;
