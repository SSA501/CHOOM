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
  const [shortsData, setShortsData] = useState([
    {
      id: null,
      title: "자동차 트렁크 챌린지ㅋㅋㅋㅋㅋㅋㅋㅋ",
      url: "https://www.youtube.com/shorts/esF2cL0iM-4",
      thumbnailPath: "https://i.ytimg.com/vi/esF2cL0iM-4/hqdefault.jpg",
      sec: 27,
      likeCount: 55845,
      viewCount: 3616286,
      userCount: 0,
      youtubeId: "esF2cL0iM-4",
      status: 0,
      publishedAt: "2023-03-08",
      bookmarked: false,
    },
    {
      id: 8,
      title: "⚠️레슬링아님⚠️ 파트너 챌린지‼️ Partner Challenge",
      url: "https://www.youtube.com/shorts/vyViJL6USI0",
      thumbnailPath: "https://i.ytimg.com/vi/vyViJL6USI0/hqdefault.jpg",
      sec: 24,
      likeCount: 89457,
      viewCount: 2207482,
      userCount: 0,
      youtubeId: "vyViJL6USI0",
      status: 0,
      publishedAt: "2023-03-17",
      bookmarked: false,
    },
    {
      id: null,
      title:
        "지각한 초딩들의 달리기폼 ㅋㅋㅋ 런런챌린지 #모니카 #달리기춤 #shorts",
      url: "https://www.youtube.com/shorts/HK_cXxNF8Os",
      thumbnailPath: "https://i.ytimg.com/vi/HK_cXxNF8Os/hqdefault.jpg",
      sec: 29,
      likeCount: 25261,
      viewCount: 1093269,
      userCount: 0,
      youtubeId: "HK_cXxNF8Os",
      status: 0,
      publishedAt: "2023-03-08",
      bookmarked: false,
    },
    {
      id: null,
      title: "가벼우면 유리한 챌린지⁉️🤔 Partner Challenge",
      url: "https://www.youtube.com/shorts/N3teZTwBDOo",
      thumbnailPath: "https://i.ytimg.com/vi/N3teZTwBDOo/hqdefault.jpg",
      sec: 35,
      likeCount: 0,
      viewCount: 821516,
      userCount: 0,
      youtubeId: "N3teZTwBDOo",
      status: 0,
      publishedAt: "2023-03-27",
      bookmarked: false,
    },
    {
      id: null,
      title:
        "우리만의 자유로운 Nineteen’s 'Kitsch' 😈 #Kitsch #Kitschchallenge #키치챌린지 #IVE #아이브 #IveIVE #아이해브아이브 #Shorts",
      url: "https://www.youtube.com/shorts/NoSZuXumTQ8",
      thumbnailPath: "https://i.ytimg.com/vi/NoSZuXumTQ8/hqdefault.jpg",
      sec: 25,
      likeCount: 67897,
      viewCount: 779945,
      userCount: 0,
      youtubeId: "NoSZuXumTQ8",
      status: 0,
      publishedAt: "2023-03-27",
      bookmarked: false,
    },
    {
      id: null,
      title:
        "K-I-T-S-C-H 😎 #Kitsch #KitschChallenge #키치챌린지 #IVE #아이브 #IveIVE #아이해브아이브 #Shorts",
      url: "https://www.youtube.com/shorts/m2GzxR6iRXo",
      thumbnailPath: "https://i.ytimg.com/vi/m2GzxR6iRXo/hqdefault.jpg",
      sec: 13,
      likeCount: 53433,
      viewCount: 523196,
      userCount: 0,
      youtubeId: "m2GzxR6iRXo",
      status: 0,
      publishedAt: "2023-03-28",
      bookmarked: false,
    },
    {
      id: 9,
      title: "웃음참기 챌린지 #shorts",
      url: "https://www.youtube.com/shorts/CKmpxarrysM",
      thumbnailPath: "https://i.ytimg.com/vi/CKmpxarrysM/hqdefault.jpg",
      sec: 38,
      likeCount: 11613,
      viewCount: 456916,
      userCount: 0,
      youtubeId: "CKmpxarrysM",
      status: 0,
      publishedAt: "2023-03-24",
      bookmarked: false,
    },
    {
      id: null,
      title: "아돈띵댓 챌린지🐻👧🏻 #Shorts",
      url: "https://www.youtube.com/shorts/lGUJTlgYJ1E",
      thumbnailPath: "https://i.ytimg.com/vi/lGUJTlgYJ1E/hqdefault.jpg",
      sec: 15,
      likeCount: 3239,
      viewCount: 187550,
      userCount: 0,
      youtubeId: "lGUJTlgYJ1E",
      status: 0,
      publishedAt: "2023-02-26",
      bookmarked: false,
    },
    {
      id: null,
      title: "수아챌린지란 무엇인가? (feat.서울동구고)",
      url: "https://www.youtube.com/shorts/LPnAbnOe5lk",
      thumbnailPath: "https://i.ytimg.com/vi/LPnAbnOe5lk/hqdefault.jpg",
      sec: 13,
      likeCount: 561,
      viewCount: 30438,
      userCount: 0,
      youtubeId: "LPnAbnOe5lk",
      status: 0,
      publishedAt: "2023-03-22",
      bookmarked: false,
    },
    {
      id: null,
      title: "Coach Han challenge - VS. PD Shin",
      url: "https://www.youtube.com/shorts/jWHM0fIyI98",
      thumbnailPath: "https://i.ytimg.com/vi/jWHM0fIyI98/hqdefault.jpg",
      sec: 59,
      likeCount: 9,
      viewCount: 332,
      userCount: 0,
      youtubeId: "jWHM0fIyI98",
      status: 0,
      publishedAt: "2023-03-29",
      bookmarked: false,
    },
  ]);
  const [page, setPage] = useState<number>(0);
  const [pageToken, setPageToken] = useState<string>("");
  const [size, setSize] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
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
  }, [query, pageToken, size]);

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
              <SpinnerContainer>
                <Spinner />
                <p>불러오는 중...</p>
              </SpinnerContainer>
            ) : (
              <VideoCarousel videoData={shortsData} title={"SHORTS"} />
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
