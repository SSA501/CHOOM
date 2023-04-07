import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBookmark,
  getChallengeDetail,
  removeBookmark,
} from "../../apis/challenge";
import Btn from "../../components/Btn/Btn";
import ChallengeDetail from "../../components/ChallengeDetail/ChallengeDetail";
import ChallengeRank from "../../components/ChallengeRank/ChallengeRank";
import LikeBtn from "../../components/LikeBtn/LikeBtn";
import {
  InnerShadowContainer,
  ChallengeDetailTitle,
  DetailPageContainer,
  VideoContainer,
  DetailTopContainer,
  DetailBtnContainer,
  DetailContainer,
  LikeBtnContainer,
  TextBox,
} from "./style";
import { SERVER_URL } from "../../constants/url";

interface RankDataTypes {
  userId: number;
  nickname: string;
  profileImage: string;
  score: number;
  videoLength: number;
  title: string;
  youtubeUrl: null | string;
}

function DetailPage() {
  const [challengeData, setChallengeData] = useState<{
    id: number;
    title: string;
    url: string;
    thumbnailPath: string;
    sec: number;
    likeCount: number;
    viewCount: number;
    userCount: number;
    youtubeId: string;
    status: number;
    publishedAt: string;
    bookmarked: boolean;
  }>({
    id: 0,
    title: "",
    url: "",
    thumbnailPath: "",
    sec: 0,
    likeCount: 0,
    viewCount: 0,
    userCount: 0,
    youtubeId: "",
    status: 0,
    publishedAt: "",
    bookmarked: false,
  });

  const [rankData, setRankData] = useState<RankDataTypes[]>([]);
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);

  const { danceId } = useParams<{ danceId: string }>();
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleLike = () => {
    if (danceId) {
      addBookmark(+danceId)
        .then(() => {
          setIsLiked(true);
          setLocalLikeCount((prev: number) => prev + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLikeDelete = () => {
    if (danceId) {
      removeBookmark(+danceId)
        .then(() => {
          setIsLiked(false);
          if (localLikeCount >= 0) {
            setLocalLikeCount((prev: number) => prev - 1);
          } else {
            setLocalLikeCount(0);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "챌린지 상세보기 - CHOOM";

    if (danceId) {
      getChallengeDetail(danceId)
        .then((res) => {
          setChallengeData(res?.data?.dance);
          setIsLiked(res?.data?.dance?.bookmarked);
          setLocalLikeCount(res?.data?.dance?.likeCount);
          setRankData(res?.data?.myDance);
        })
        .catch((err) => console.log(err));
    }
  }, [danceId]);

  const { url, title, userCount, sec, viewCount, publishedAt, id } =
    challengeData;

  return (
    <DetailPageContainer>
      <VideoContainer>
        <ReactPlayer
          url={url}
          controls
          loop
          muted
          playing
          width="360px"
          height="640px"
        />
      </VideoContainer>

      <DetailContainer>
        <DetailTopContainer>
          <InnerShadowContainer position={"relative"}>
            <ChallengeDetailTitle>DETAIL</ChallengeDetailTitle>
            <ChallengeDetail
              title={title}
              userCount={userCount}
              sec={sec}
              viewCount={viewCount}
              publishedAt={publishedAt}
            />
            <LikeBtnContainer>
              <LikeBtn
                localLikeCount={localLikeCount}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                handleLike={handleLike}
                handleLikeDelete={handleLikeDelete}
              />
            </LikeBtnContainer>
          </InnerShadowContainer>
          <InnerShadowContainer>
            <ChallengeDetailTitle>RANK</ChallengeDetailTitle>
            {rankData?.length > 0 ? (
              rankData?.map(
                ({
                  userId,
                  nickname,
                  score,
                  youtubeUrl,
                  // tiktokUrl,
                  profileImage,
                }) => (
                  <ChallengeRank
                    key={userId}
                    userId={userId}
                    nickname={nickname}
                    score={score}
                    youtubeUrl={youtubeUrl}
                    // tiktokUrl={tiktokUrl}
                    profileImage={`${SERVER_URL}${profileImage}`}
                  />
                )
              )
            ) : (
              <TextBox>
                아직 이 챌린지를 연습한 사람이 없어요! 연습해볼까요?
              </TextBox>
            )}
          </InnerShadowContainer>
        </DetailTopContainer>
        <DetailBtnContainer>
          <Btn
            btnText={"챌린지 시작하기"}
            handleClick={() => {
              navigate(`/dance/${id}`);
            }}
          />
        </DetailBtnContainer>
      </DetailContainer>
    </DetailPageContainer>
  );
}

export default DetailPage;
