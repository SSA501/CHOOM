import React from "react";
import MainBanner from "../../components/MainBanner/MainBanner";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import SearchBar from "../../components/SearchBar/SearchBar";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import { pickRandomColor } from "../../utils/utils";
import { TopContainer } from "./style";

export interface VideoDataProps {
  id: number;
  videoSrc: string;
  thumbnailSrc: string;
  frameColor?: string;
}

function MainPage() {
  const popularVideoData: VideoDataProps[] = [
    {
      id: 1,
      videoSrc:
        "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
    {
      id: 2,
      videoSrc:
        "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
    {
      id: 3,
      // videoSrc: "https://www.youtube.com/shorts/fYQxthUKung",
      videoSrc:
        "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
    {
      id: 4,
      videoSrc:
        "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
    {
      id: 5,
      videoSrc:
        "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
      thumbnailSrc:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
    },
  ];

  for (let video of popularVideoData) {
    video.frameColor = pickRandomColor();
  }

  return (
    <>
      <TopContainer>
        <MainBanner />
        <SearchBar />
      </TopContainer>
      <ScrollingText />
      <VideoCarousel
        title={"요즘 인기있는 챌린지 🔥"}
        text={
          "최근 가장 인기있는 챌린지를 모아봤어요 어떤 챌린지를 할지 요즘 가장 인기있는 챌린지를 모아봤어요 어떤 챌린지를 할지 고민된다면 추천해요"
        }
        videoData={popularVideoData}
        handleBtnClick={() => {}}
      />
    </>
  );
}

export default MainPage;
