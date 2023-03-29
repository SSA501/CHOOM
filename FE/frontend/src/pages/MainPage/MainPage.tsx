import React, { useEffect, useState } from "react";
import { getPopularChallenge } from "../../apis/challenge";
import MainBanner from "../../components/MainBanner/MainBanner";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import SearchArea from "../../components/SearchArea/SearchArea";
import SearchBar from "../../components/SearchBar/SearchBar";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import { TopContainer } from "./style";

export interface VideoDataProps {
  id: number;
  videoPath: string;
  thumbnailPath: string;
  frameColor?: string;
  title: string;
  url: string;
  userCount: number;
  status: number;
}

function MainPage() {
  const [popularVideoData, setPopularVideoData] = useState<VideoDataProps[]>([
    {
      id: 1,
      videoPath: "/assets/newjeans.mp4",
      thumbnailPath:
        "https://i.ytimg.com/vi/SmyFP2MgL4s/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLDXcvDW_CadJyq7wPyRFksAyP0VPQ",
      title: "하입보이",
      url: "https://youtu.be/videoId",
      userCount: 2,
      status: 2,
    },
    {
      id: 2,
      videoPath: "/assets/newjeans.mp4",
      thumbnailPath:
        "https://i.ytimg.com/vi/SmyFP2MgL4s/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLDXcvDW_CadJyq7wPyRFksAyP0VPQ",
      title: "하입보이",
      url: "https://youtu.be/videoId",
      userCount: 2,
      status: 2,
    },
    {
      id: 3,
      videoPath: "/assets/newjeans.mp4",
      // videoPath: "https://www.youtube.com/shorts/fYQxthUKung",
      thumbnailPath:
        "https://i.ytimg.com/vi/SmyFP2MgL4s/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLDXcvDW_CadJyq7wPyRFksAyP0VPQ",
      title: "하입보이",
      url: "https://youtu.be/videoId",
      userCount: 2,
      status: 2,
    },
    {
      id: 4,
      videoPath: "/assets/newjeans.mp4",
      thumbnailPath:
        "https://i.ytimg.com/vi/SmyFP2MgL4s/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLDXcvDW_CadJyq7wPyRFksAyP0VPQ",
      title: "하입보이",
      url: "https://youtu.be/videoId",
      userCount: 2,
      status: 2,
    },
    {
      id: 5,
      videoPath: "/assets/newjeans.mp4",
      thumbnailPath:
        "https://i.ytimg.com/vi/SmyFP2MgL4s/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLDXcvDW_CadJyq7wPyRFksAyP0VPQ",
      title: "하입보이",
      url: "https://youtu.be/videoId",
      userCount: 2,
      status: 2,
    },
  ]);

  useEffect(() => {
    getPopularChallenge()
      .then((res) => {
        console.log(res.data);
        setPopularVideoData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <TopContainer>
        <MainBanner />
        <SearchArea />
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
