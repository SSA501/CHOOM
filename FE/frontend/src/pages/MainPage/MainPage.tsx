import React, { useEffect, useState } from "react";
import { getPopularChallenge } from "../../apis/challenge";
import MainBanner from "../../components/MainBanner/MainBanner";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import SearchArea from "../../components/SearchArea/SearchArea";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import { TopContainer } from "./style";

export interface VideoDataProps {
  youtubeId: number;
  videoPath: string;
  thumbnailPath: string;
  title: string;
  url: string;
  userCount: number;
  status: number;
}

function MainPage() {
  const [popularVideoData, setPopularVideoData] = useState<VideoDataProps[]>(
    []
  );

  useEffect(() => {
    getPopularChallenge()
      .then((res) => {
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
      />
    </>
  );
}

export default MainPage;
