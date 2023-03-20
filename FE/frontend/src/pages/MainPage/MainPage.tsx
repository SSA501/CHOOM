import React from "react";
import MainBanner from "../../components/MainBanner/MainBanner";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import { pickRandomColor } from "../../utils/utils";

export interface VideoData {
  id: number;
  videoSrc: string;
  thumbnailSrc: string;
  frameColor?: string;
}

function MainPage() {
  const videoData: VideoData[] = [
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

  for (let video of videoData) {
    video.frameColor = pickRandomColor();
  }

  return (
    <>
      <MainBanner />
      <VideoCarousel
        title={"요즘 인기있는 챌린지 🔥"}
        titleAlign={"center"}
        videoData={videoData}
      />
    </>
  );
}

export default MainPage;
