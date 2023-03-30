import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchDance } from "../../apis/challenge";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideTitle from "../../components/SideTitle/SideTitle";
import Spinner from "../../components/Spinner/Spinner";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import {
  SearchTopContainer,
  SideContainer,
  SearchContainer,
  ChallengeNumber,
  PopularChallengeContainer,
  YoutubeChallengeContainer,
  SpinnerContainer,
} from "./style";

function SearchPage() {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();
  const query = searchParams?.get("query");
  const [topData, setTopData] = useState([
    {
      id: 12,
      title: "스노우맨 한호흡 챌린지 최강자끼리 붙음 ; ;",
      url: "https://www.youtube.com/shorts/5-TLkt0sjpQ",
      thumbnailPath: "https://i.ytimg.com/vi/5-TLkt0sjpQ/hqdefault.jpg",
      sec: 50,
      likeCount: 559324,
      viewCount: 13607439,
      userCount: 13,
      youtubeId: "5-TLkt0sjpQ",
      status: 1,
      publishedAt: "2022-11-08",
      bookmarked: false,
      bookmarkeCount: 32,
    },
    {
      id: 7,
      title: "현남친 앞에서 전남친챌린지ㅋㅋㅋ전남친vs현남친 #shorts",
      url: "https://www.youtube.com/shorts/RBz7rFKn8WM",
      thumbnailPath: "https://i.ytimg.com/vi/RBz7rFKn8WM/hqdefault.jpg",
      sec: 37,
      likeCount: 103691,
      viewCount: 6710144,
      userCount: 5,
      youtubeId: "RBz7rFKn8WM",
      status: 1,
      publishedAt: "2022-12-12",
      bookmarked: true,
      bookmarkeCount: 16,
    },
  ]);
  const [shortsData, setShortsData] = useState([]);
  const [size, setSize] = useState<number>(50); // size 50 고정
  const [pageToken, setPageToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
      console.log(query);
      setIsLoading(true);
      searchDance(query, pageToken, size)
        .then((res) => {
          console.log(res.data);
          setTopData(res?.data?.dbSearch);
          setShortsData(res?.data?.search);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [query, pageToken]);

  return (
    <>
      <SearchTopContainer>
        <SideContainer>
          <SideTitle title={["검색", ""]} />
        </SideContainer>
        <SearchContainer>
          <SearchBar currentQuery={query} />
        </SearchContainer>
      </SearchTopContainer>
      {query ? (
        <>
          <PopularChallengeContainer>
            <SideContainer>
              <SideTitle title={["가장 많이", "참여한 챌린지 🎉"]} />
            </SideContainer>
            <div style={{ display: "flex" }}>
              <div>
                <ChallengeNumber>#1</ChallengeNumber>
                <ChallengeCard challengeInfo={topData[0]} bgColor="purple" />
              </div>
              <div>
                <ChallengeNumber>#2</ChallengeNumber>
                <ChallengeCard challengeInfo={topData[1]} bgColor="green" />
              </div>
            </div>
          </PopularChallengeContainer>
          <YoutubeChallengeContainer>
            {isLoading ? (
              <>
                <Spinner text={"검색결과 불러오는 중..."} />
              </>
            ) : (
              <VideoCarousel videoData={shortsData} title={"SHORTS"} isSearch />
            )}
          </YoutubeChallengeContainer>
        </>
      ) : (
        <RecentSearch />
      )}
    </>
  );
}

export default SearchPage;
