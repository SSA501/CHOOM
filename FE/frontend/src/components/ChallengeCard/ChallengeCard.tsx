import React, { useState, useEffect } from "react";
import {
  MdOutlineCalendarMonth,
  MdOutlinePeopleAlt,
  MdOutlineQueryBuilder,
  MdOutlineVisibility,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addBookmark, removeBookmark } from "../../apis/challenge";
import Btn from "../Btn/Btn";
import LikeBtn from "../LikeBtn/LikeBtn";
import { ShadowContainer } from "../ShadowContainer/style";
import Video from "../Video/Video";
import { SideContainer, ChallengeTitle, TableContainer } from "./style";

interface ChallengeDataProps {
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
}

export type ChallengeProps = {
  challengeInfo: ChallengeDataProps;
  bgColor: string;
};

function ChallengeCard({ challengeInfo, bgColor }: ChallengeProps) {
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState<ChallengeDataProps>({
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
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);

  const handleClickVideo = (videoId: number): void => {
    navigate(`/detail/${videoId}`);
  };

  const handleLike = () => {
    addBookmark(challengeData?.id)
      .then(() => {
        setIsLiked(true);
        setLocalLikeCount((prev: number) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  const handleLikeDelete = () => {
    removeBookmark(challengeData?.id)
      .then(() => {
        setIsLiked(false);
        if (localLikeCount >= 0) {
          setLocalLikeCount((prev: number) => prev - 1);
        } else {
          setLocalLikeCount(0);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setChallengeData(challengeInfo);
    setIsLiked(challengeInfo?.bookmarked);
    setLocalLikeCount(challengeInfo?.likeCount);
  }, [challengeInfo]);

  return (
    <ShadowContainer
      width={"600px"}
      height={"540px"}
      padding={"24px"}
      margin={"24px 36px"}
      bgColor={bgColor}
      style={{ display: "flex" }}
    >
      <SideContainer>
        <LikeBtn
          localLikeCount={localLikeCount}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          handleLike={handleLike}
          handleLikeDelete={handleLikeDelete}
        />
        <ChallengeTitle>
          {challengeData?.title.length > 24
            ? challengeData?.title.substr(0, 24) + "..."
            : challengeData?.title}
        </ChallengeTitle>
        <TableContainer>
          <table>
            <tr>
              <td>
                <MdOutlinePeopleAlt />
              </td>
              <td>
                {challengeData?.userCount}
                <span>명</span>
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineQueryBuilder />
              </td>
              <td>
                {challengeData?.sec}
                <span>초</span>
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineVisibility />
              </td>
              <td>{challengeData?.viewCount.toLocaleString("en")}</td>
            </tr>
            <tr>
              <td>
                <MdOutlineCalendarMonth />
              </td>
              <td>{challengeData?.publishedAt.replace(/-/gi, ".")}</td>
            </tr>
          </table>
        </TableContainer>
        <Btn
          btnText={"시작하기"}
          handleClick={() => navigate(`/dance/${challengeData?.id}`)}
          padding={"15px 70px"}
        ></Btn>
      </SideContainer>
      <Video
        width={"270px"}
        height={"480px"}
        id={challengeData?.id}
        title={challengeData?.title}
        url={challengeData?.url}
        videoPath={challengeData?.url}
        thumbnailPath={challengeData?.thumbnailPath}
        handleClickVideo={() => handleClickVideo(challengeData?.id)}
      />
    </ShadowContainer>
  );
}

export default ChallengeCard;
