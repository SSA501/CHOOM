import React from "react";
import { RankContainer, RankInnerDiv, RankOuterContainer } from "./style";

interface ChallengeRankProps {
  userId: number;
  nickname: string;
  score: number;
  youtubeUrl: string;
  tiktokUrl: string;
}

function ChallengeRank({
  userId,
  nickname,
  score,
  youtubeUrl,
  tiktokUrl,
}: ChallengeRankProps) {
  return (
    <RankOuterContainer key={userId}>
      <RankContainer>
        <h3>{score}점</h3>
        <RankInnerDiv>
          <span>{nickname}</span>
          <div>
            <a href={youtubeUrl}>
              <img
                width={"32px"}
                style={{ marginRight: "1em" }}
                src={
                  youtubeUrl !== ""
                    ? "/assets/icon_youtube_shorts.png"
                    : "/assets/icon_youtube_shorts_disable.png"
                }
                alt="쇼츠 챌린지 링크"
              />
            </a>
            <a href={tiktokUrl}>
              <img
                width={"42px"}
                src={
                  tiktokUrl !== ""
                    ? "/assets/icon_tiktok.png"
                    : "/assets/icon_tiktok_disable.png"
                }
                alt="쇼츠 챌린지 링크"
              />
            </a>
          </div>
        </RankInnerDiv>
      </RankContainer>
    </RankOuterContainer>
  );
}

export default ChallengeRank;
