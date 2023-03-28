import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChallengeDetail } from "../../apis/challenge";
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
} from "./style";

function DetailPage() {
  const [challengeData, setChallengeData] = useState({
    danceId: 123,
    videoId: "khcSrutAcTo",
    url: "/assets/newjeans.mp4",
    thumbnailSrc:
      "https://i.ytimg.com/vi/SmyFP2MgL4s/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLDXcvDW_CadJyq7wPyRFksAyP0VPQ",
    title:
      "#뉴진스 #하입보이 #hypeboy #newjeans #지금무슨노래 #하입보이챌린지 #쇼츠 #shorts",
    userCount: 2,
    likeCount: 3,
    status: 0,
    sec: 56,
    viewCount: 1426395,
    publishedAt: "2023.03.10",
  });

  const [rankData, setRankData] = useState([
    {
      userId: 0,
      nickname: "닉네임최대닉네임최대",
      score: 99,
      videoLength: 0,
      title: "내가",
      youtubeUrl: "",
      tiktokUrl:
        "https://www.tiktok.com/@n1mbostratus/video/7208437948126153985?q=%EC%B1%8C%EB%A6%B0%EC%A7%80",
    },
    {
      userId: 1,
      nickname: "sdfsdf",
      score: 70,
      videoLength: 0,
      title: "내가만든쇼츠~",
      youtubeUrl:
        "https://www.youtube.com/watch?v=eATSXqJ6htE&list=RDeATSXqJ6htE&start_radio=1",
      tiktokUrl: "",
    },
    {
      userId: 2,
      nickname: "sdfsdf",
      score: 70,
      videoLength: 0,
      title: "내가만든쇼츠~",
      youtubeUrl:
        "https://www.youtube.com/watch?v=eATSXqJ6htE&list=RDeATSXqJ6htE&start_radio=1",
      tiktokUrl: "",
    },
  ]);

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    // TODO: 좋아요 추가
  };
  const handleLikeDelete = () => {
    // TODO: 좋아요 삭제
  };

  useEffect(() => {
    if (id) {
      getChallengeDetail(id)
        .then((res) => {
          setChallengeData(res?.data?.dance);
          setRankData(res?.data?.myDance);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const {
    url,
    title,
    userCount,
    sec,
    viewCount,
    publishedAt,
    danceId,
    likeCount,
  } = challengeData;

  return (
    <DetailPageContainer>
      <VideoContainer>
        <video
          src={url}
          autoPlay
          controls
          controlsList="nodownload"
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
                likeCount={likeCount}
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
                ({ userId, nickname, score, youtubeUrl, tiktokUrl }) => (
                  <ChallengeRank
                    key={userId}
                    userId={userId}
                    nickname={nickname}
                    score={score}
                    youtubeUrl={youtubeUrl}
                    tiktokUrl={tiktokUrl}
                  />
                )
              )
            ) : (
              <div>아직 이 챌린지를 연습한 사람이 없어요! 연습해볼까요?</div>
            )}
          </InnerShadowContainer>
        </DetailTopContainer>
        <DetailBtnContainer>
          <Btn
            btnText={"챌린지 시작하기"}
            handleClick={() => {
              navigate(`/dance/${danceId}`);
            }}
          />
        </DetailBtnContainer>
      </DetailContainer>
    </DetailPageContainer>
  );
}

export default DetailPage;
