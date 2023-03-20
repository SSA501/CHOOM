import React from "react";
import { VideoDataProps } from "../../pages/MainPage/MainPage";
import Video from "../Video/Video";
import {
  FlowText,
  FlowTextContainer,
  RecentChallengeContainer,
  RecentVideosContainer,
} from "./style";

interface RecentChallengeProps {
  videoData: VideoDataProps[];
}

function RecentChallenge({ videoData }: RecentChallengeProps) {
  return (
    <RecentChallengeContainer>
      <FlowTextContainer>
        <FlowText>
          Recent Challenges ✨ Recent Challenges ✨ Recent Challenges ✨ Recent
          Challenges ✨ Recent Challenges ✨ Recent Challenges ✨ Recent
          Challenges ✨ Recent Challenges ✨ Recent Challenges ✨ Recent
          Challenges ✨ Recent Challenges ✨ Recent Challenges ✨ Recent
          Challenges ✨ Recent Challenges ✨ Recent Challenges ✨ Recent
          Challenges ✨
        </FlowText>
      </FlowTextContainer>
      <RecentVideosContainer>
        {videoData?.map(({ id, videoSrc, thumbnailSrc }) => (
          <div style={{ width: "300px" }}>
            <Video
              id={id}
              videoSrc={videoSrc}
              thumbnailSrc={thumbnailSrc}
              frameColor={"black"}
            />
          </div>
        ))}
      </RecentVideosContainer>
    </RecentChallengeContainer>
  );
}

export default RecentChallenge;
