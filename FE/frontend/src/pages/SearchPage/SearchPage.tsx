import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getSearchKeywordList,
  removeSearchKeyword,
  searchDance,
} from "../../apis/challenge";
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
  const query: string | null = searchParams?.get("query");
  const [topData, setTopData] = useState([]);
  const [shortsData, setShortsData] = useState([]);
  const [size, setSize] = useState<number>(50); // size 50 일단 고정
  const [pageToken, setPageToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      getSearchKeywordList()
        .then((res) => {
          const result = res?.data.find((item: any) => item.keyword === query);
          if (result) {
            removeSearchKeyword(result.searchId);
          }
        })
        .catch((err) => console.log(err));
      searchDance(query, pageToken, size)
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          const data = res?.data;
          if (data?.isUrl && data?.dbSearch?.length > 0) {
            // 쇼츠 url 입력이라면 바로 상세페이지로 넘어가기
            navigate(`/detail/${data?.dbSearch[0]?.id}`);
          } else if (data?.dbSearch?.length === 0 && data?.search?.length > 0) {
            // db에 저장된거 없으면 쇼츠 데이터 중에 2개 넣어주기
            setTopData(data?.search?.slice(0, 2));
            setShortsData(data?.search?.slice(2));
          } else {
            setTopData(data?.dbSearch);
            setShortsData(data?.search);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [query, pageToken, size, navigate]);

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
          {isLoading ? (
            <Spinner text={"검색결과 불러오는 중... 잠시만요!"} />
          ) : (
            <>
              <PopularChallengeContainer>
                <div style={{ display: "flex" }}>
                  <SideContainer>
                    <SideTitle title={["가장 많이", "참여한 챌린지 🎉"]} />
                  </SideContainer>
                  {topData.length > 0 &&
                    topData?.map((data, index) => (
                      <div>
                        <ChallengeNumber>#{index + 1}</ChallengeNumber>
                        <ChallengeCard
                          challengeInfo={data}
                          bgColor={index === 0 ? "purple" : "green"}
                        />
                      </div>
                    ))}
                </div>
              </PopularChallengeContainer>
              {shortsData.length > 0 && (
                <YoutubeChallengeContainer>
                  <VideoCarousel
                    videoData={shortsData}
                    title={"SHORTS"}
                    isSearch
                    text={
                      "유튜브 쇼츠 중 인기 영상을 모아봤어요 어떤 챌린지를 할지 고민된다면 추천해요"
                    }
                  />
                </YoutubeChallengeContainer>
              )}
            </>
          )}
        </>
      ) : (
        <RecentSearch />
      )}
    </>
  );
}

export default SearchPage;
