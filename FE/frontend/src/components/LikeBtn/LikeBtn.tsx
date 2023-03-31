import React, { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { ReactComponent as SpeechBubble } from "./speechBubble.svg";
import { LikeBtnContentContainer, LikeBtnOuterContainer } from "./style";

interface LikeBtnProps {
  localLikeCount: number;
  isLiked: boolean | null;
  setIsLiked: (flag: any) => void;
  handleLike: () => void;
  handleLikeDelete: () => void;
}

function LikeBtn({
  localLikeCount,
  isLiked,
  handleLike,
  handleLikeDelete,
}: LikeBtnProps) {
  const fillHeart = isLiked ? "red" : "";

  return (
    <LikeBtnOuterContainer>
      <SpeechBubble stroke="black" />
      <LikeBtnContentContainer>
        <span
          style={{
            fill: fillHeart,
            color: "red",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (isLiked) {
              handleLikeDelete();
            } else {
              handleLike();
            }
          }}
        >
          {isLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
        </span>

        <span> {localLikeCount}</span>
      </LikeBtnContentContainer>
    </LikeBtnOuterContainer>
  );
}

export default LikeBtn;
