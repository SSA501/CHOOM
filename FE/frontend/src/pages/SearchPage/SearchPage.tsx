import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addSearchKeyword,
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
  NoResultText,
} from "./style";

function SearchPage() {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();
  const query: string | null = searchParams?.get("query");
  const [topData, setTopData] = useState([]);
  const [shortsData, setShortsData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("검색결과가 없어요ㅠㅠ");
  const navigate = useNavigate();

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "챌린지 검색 - CHOOM";

    if (query) {
      setIsLoading(true);
      // 검색어 조회
      getSearchKeywordList()
        .then((res) => {
          const result = res?.data.find((item: any) => item.keyword === query);
          if (result) {
            removeSearchKeyword(result.searchId);
          }
        })
        .catch((err) => console.log(err));

      // 검색 실행
      searchDance(query, 10) // size 10으로 고정
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          const data = res?.data;
          // url일 경우
          if (data?.isUrl) {
            if (data?.dbSearch?.length > 0) {
              if (data?.dbSearch[0]?.embeddable) {
                // 쇼츠 url 입력이고 외부 재생 가능시 바로 상세페이지로 넘어가기
                navigate(`/detail/${data?.dbSearch[0]?.id}`);
              } else {
                setErrorMsg("외부에서 조회 불가능한 영상입니다.");
              }
            } else {
              setErrorMsg("쇼츠 URL이 아닙니다. 링크를 다시 확인해주세요!");
            }
          } else {
            addSearchKeyword(query); // url 아닐때만 검색어 저장
            // db에 저장된거 없으면
            if (data?.dbSearch?.length === 0) {
              if (data?.search?.length > 0) {
                // 쇼츠 데이터 있으면 그중에 2개 넣어주기
                setTopData(data?.search?.slice(0, 2));
                setShortsData(data?.search?.slice(2));
              } else {
                // 쇼츠 데이터도 없으면
                setErrorMsg("검색결과가 없어요ㅠㅠ");
              }
            } else if (data?.dbSearch?.length === 1) {
              const tmpTop: (number | string | null)[] = [] as never[];
              tmpTop.push(data?.dbSearch[0]);
              tmpTop.push(data?.search[0]);
              setTopData(tmpTop as never[]);
              setShortsData(data?.search?.slice(1));
            } else {
              setTopData(data?.dbSearch);
              setShortsData(data?.search);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [query, navigate]);

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
                          key={index}
                        />
                      </div>
                    ))}
                </div>
              </PopularChallengeContainer>
              {shortsData.length > 0 && (
                <YoutubeChallengeContainer>
                  <VideoCarousel
                    videoData={shortsData}
                    titleImg={"/assets/icon_youtube_shorts.png"}
                    title={"SHORTS"}
                    isSearch
                    text={
                      "유튜브 쇼츠 중 인기 영상을 모아봤어요 어떤 챌린지를 할지 고민된다면 추천해요!"
                    }
                  />
                </YoutubeChallengeContainer>
              )}
              {topData.length === 0 && shortsData.length === 0 && (
                <NoResultText>
                  <p>{errorMsg}</p>
                </NoResultText>
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
