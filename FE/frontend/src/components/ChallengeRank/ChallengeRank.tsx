import React from "react";
import { useNavigate } from "react-router";
import {
  ProfileDetailContainer,
  ProfilePicContainer,
  RankContainer,
  RankInnerDiv,
  RankOuterContainer,
} from "./style";

interface ChallengeRankProps {
  userId: number;
  nickname: string;
  score: number;
  youtubeUrl: string | null;
  // tiktokUrl: string;
  profileImage: string;
}

function ChallengeRank({
  userId,
  nickname,
  score,
  youtubeUrl,
  // tiktokUrl,
  profileImage,
}: ChallengeRankProps) {
  return (
    <RankOuterContainer key={userId}>
      <RankContainer>
        <ProfilePicContainer>
          <img src={profileImage} alt={`${nickname}님의 프로필 사진`} />
        </ProfilePicContainer>
        <ProfileDetailContainer>
          <h3>{score}점</h3>
          <RankInnerDiv>
            <p>{nickname}</p>
            <div>
              {youtubeUrl !== null ? (
                <a href={youtubeUrl}>
                  <img
                    width={"32px"}
                    style={{ marginRight: "1em" }}
                    src={"/assets/icon_youtube_shorts.png"}
                    alt="쇼츠 챌린지 링크"
                  />
                </a>
              ) : (
                <img
                  width={"32px"}
                  style={{ marginRight: "1em" }}
                  src={"/assets/icon_youtube_shorts_disable.png"}
                  alt="쇼츠 챌린지 링크 없음"
                />
              )}
              {/* {tiktokUrl !== "" ? (
                <a href={tiktokUrl}>
                  <img
                    width={"42px"}
                    style={{ marginRight: "1em" }}
                    src={"/assets/icon_tiktok.png"}
                    alt="틱톡 챌린지 링크"
                  />
                </a>
              ) : (
                <img
                  width={"42px"}
                  style={{ marginRight: "1em" }}
                  src={"/assets/icon_tiktok_disable.png"}
                  alt="틱톡 챌린지 링크 없음"
                />
              )} */}
            </div>
          </RankInnerDiv>
        </ProfileDetailContainer>
      </RankContainer>
    </RankOuterContainer>
  );
}

export default ChallengeRank;
