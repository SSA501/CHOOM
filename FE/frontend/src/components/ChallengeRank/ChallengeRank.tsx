import React, { useState } from "react";
import {
  ProfileDetailContainer,
  ProfilePicContainer,
  RankContainer,
  RankInnerDiv,
  RankOuterContainer,
} from "./style";
import RankModal from "../Modal/RankModal";

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
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickProfile = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <RankOuterContainer key={userId}>
        <RankContainer>
          <ProfilePicContainer onClick={handleClickProfile}>
            <img
              src={profileImage}
              width="60px"
              height="60px"
              alt={`${nickname}님의 프로필 사진`}
              style={{ cursor: "pointer" }}
            />
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
              </div>
            </RankInnerDiv>
          </ProfileDetailContainer>
        </RankContainer>
      </RankOuterContainer>
      {modalOpen && (
        <RankModal
          userId={userId}
          nickname={nickname}
          profileImage={profileImage}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}

export default ChallengeRank;
