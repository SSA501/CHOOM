import React from "react";
import { MdOutlineMode } from "react-icons/md";
import {
  ChallengeDetailContainer,
  ChallengeTitleContainer,
  TableContainer,
} from "./style";

interface ChallengeDetailProps {
  title: string;
  userCount: number;
  sec: number;
  viewCount: number;
  publishedAt: string;
}

function ChallengeDetail({
  title,
  userCount,
  sec,
  viewCount,
  publishedAt,
}: ChallengeDetailProps) {
  return (
    <ChallengeDetailContainer>
      <ChallengeTitleContainer>
        <h3>{title}</h3>
        {/* <div>
          <MdOutlineMode />
          <span>제목 편집</span>
        </div> */}
      </ChallengeTitleContainer>
      <TableContainer>
        <div>
          <strong>참여수</strong>
          <p>
            {userCount}
            <span>명</span>
          </p>
        </div>
        <div>
          <strong>동영상 길이</strong>
          <p>
            {sec}
            <span>초</span>
          </p>
        </div>
        <div>
          <strong>조회수</strong>
          <p>{viewCount.toLocaleString("en")}</p>
        </div>
        <div>
          <strong>업로드 날짜</strong>
          <p>{publishedAt}</p>
        </div>
      </TableContainer>
    </ChallengeDetailContainer>
  );
}

export default ChallengeDetail;
