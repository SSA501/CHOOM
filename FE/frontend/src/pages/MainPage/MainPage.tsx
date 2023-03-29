import React, { useEffect, useState } from "react";
import { getPopularChallenge } from "../../apis/challenge";
import MainBanner from "../../components/MainBanner/MainBanner";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import SearchArea from "../../components/SearchArea/SearchArea";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import { TopContainer } from "./style";

export interface VideoDataProps {
  id: number | null;
  title: string;
  url?: string;
  thumbnailPath: string;
  sec?: number;
  likeCount?: number;
  viewCount?: number;
  userCount: number;
  youtubeId: string;
  status: number;
  videoPath?: string;
  publishedAt?: string;
  bookmarked?: boolean;
}

function MainPage() {
  const [popularVideoData, setPopularVideoData] = useState<VideoDataProps[]>(
    []
  );

  useEffect(() => {
    getPopularChallenge()
      .then((res) => {
        setPopularVideoData(res.data);
        // console.log(res.data);
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
