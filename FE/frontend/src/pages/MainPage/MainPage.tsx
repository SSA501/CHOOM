import React, { useEffect, useState } from "react";
import { getPopularChallenge } from "../../apis/challenge";
import MainBanner from "../../components/MainBanner/MainBanner";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import SearchArea from "../../components/SearchArea/SearchArea";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import { AnimatedComponent, TopContainer } from "./style";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

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
  const [isFirstVisible, firstRref] = useIntersectionObserver();
  const [isSecondVisible, secondRef] = useIntersectionObserver();

  useEffect(() => {
    getPopularChallenge()
      .then((res) => {
        setPopularVideoData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AnimatedComponent isVisible={isFirstVisible} ref={firstRref}>
        <TopContainer>
          <MainBanner />
          <SearchArea />
        </TopContainer>
      </AnimatedComponent>
      <AnimatedComponent isVisible={isSecondVisible} ref={secondRef}>
        <ScrollingText />
        <VideoCarousel
          title={"요즘 인기있는 챌린지 🔥"}
          text={
            "최근 가장 인기있는 챌린지를 모아봤어요 어떤 챌린지를 할지 고민된다면 시도해보는 건 어때요? 😆"
          }
          videoData={popularVideoData}
        />
      </AnimatedComponent>
    </>
  );
}

export default MainPage;
