import React, { useState } from "react";
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

export type ChallengeProps = {
  challengeInfo: {
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
    bookmarkeCount: number;
  };
  bgColor: string;
};

function ChallengeCard({ challengeInfo, bgColor }: ChallengeProps) {
  const navigate = useNavigate();
  const [challegeInfo, setChallengeInfo] = useState(challengeInfo);
  const [isLiked, setIsLiked] = useState<boolean>(challegeInfo.bookmarked);

  const handleClickVideo = (videoId: number): void => {
    navigate(`/detail/${videoId}`);
  };

  const handleLike = () => {
    addBookmark(challegeInfo.id)
      .then((res) => {
        console.log(res.data);
        if (res.statusCode === 200) {
          setIsLiked(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLikeDelete = () => {
    removeBookmark(challegeInfo.id)
      .then((res) => {
        console.log(res.data);
        if (res.statusCode === 200) {
          setIsLiked(false);
        }
      })
      .catch((err) => console.log(err));
  };

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
          likeCount={challegeInfo.bookmarkeCount}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          handleLike={handleLike}
          handleLikeDelete={handleLikeDelete}
        />
        <ChallengeTitle>
          {challegeInfo.title.length > 24
            ? challegeInfo.title.substr(0, 24) + "..."
            : challegeInfo.title}
        </ChallengeTitle>
        <TableContainer>
          <table>
            <tr>
              <td>
                <MdOutlinePeopleAlt />
              </td>
              <td>
                {challegeInfo.userCount}
                <span>명</span>
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineQueryBuilder />
              </td>
              <td>
                {challegeInfo.sec}
                <span>초</span>
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineVisibility />
              </td>
              <td>{challegeInfo.viewCount.toLocaleString("en")}</td>
            </tr>
            <tr>
              <td>
                <MdOutlineCalendarMonth />
              </td>
              <td>{challegeInfo.publishedAt.replace(/-/gi, ".")}</td>
            </tr>
          </table>
        </TableContainer>
        <Btn
          btnText={"시작하기"}
          handleClick={() => navigate(`/dance/${challegeInfo.id}`)}
          padding={"15px 70px"}
        ></Btn>
      </SideContainer>
      <Video
        width={"270px"}
        height={"480px"}
        id={challegeInfo.id}
        title={challegeInfo.title}
        videoPath={challegeInfo.url}
        thumbnailPath={challegeInfo.thumbnailPath}
        handleClickVideo={() => handleClickVideo(challegeInfo.id)}
      />
    </ShadowContainer>
  );
}

export default ChallengeCard;
