import React, { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { ReactComponent as SpeechBubble } from "./speechBubble.svg";
import { LikeBtnContentContainer, LikeBtnOuterContainer } from "./style";

interface LikeBtnProps {
  likeCount: number;
  isLiked: boolean | null;
  setIsLiked: (flag: any) => void;
  handleLike: () => void;
  handleLikeDelete: () => void;
}

/**
 *
 * @param likeCount 좋아요 개수
 * @param isLiked 좋아요 여부 state
 * @param setIsLiked 좋아요 여부 state 변경
 * @param handleLike 좋아요 등록 함수
 * @param handleLikeDelete 좋아요 삭제 함수
 */

function LikeBtn({
  likeCount,
  isLiked,
  setIsLiked,
  handleLike,
  handleLikeDelete,
}: LikeBtnProps) {
  const fillHeart = isLiked ? "red" : "";
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);

  useEffect(() => {
    setLocalLikeCount(likeCount);
  }, [likeCount]);

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
              handleLike();
              if (localLikeCount >= 0) {
                setLocalLikeCount((prev: number) => prev - 1);
              } else {
                setLocalLikeCount(0);
              }
            } else {
              handleLikeDelete();
              setLocalLikeCount((prev: number) => prev + 1);
            }
            setIsLiked((prev: boolean) => !prev);
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
