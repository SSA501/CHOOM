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
} from "./style";

function SearchPage() {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();
  const query = searchParams?.get("query");
  const [topData, setTopData] = useState([]);
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
              <>
                <Spinner text={"검색결과 불러오는 중..."} />
              </>
            ) : (
              <VideoCarousel
                videoData={shortsData}
                title={"SHORTS"}
                isSearch
                text={
                  "유튜브 쇼츠 중 인기 영상을 모아봤어요 어떤 챌린지를 할지 고민된다면 추천해요"
                }
              />
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
