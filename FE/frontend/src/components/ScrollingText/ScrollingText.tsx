import React from "react";
import {
  FlowText,
  FlowTextContainer,
  GreenBox,
  ScrollingTextContainer,
} from "./style";

function ScrollingText() {
  let flowText = "";
  for (let i = 0; i < 20; i++) {
    flowText += "Popular Challenges ✨ ";
  }

  return (
    <ScrollingTextContainer>
      <FlowTextContainer>
        <FlowText>{flowText}</FlowText>
      </FlowTextContainer>
      <GreenBox />
      {/* <RecentVideosContainer>
        {videoData?.map(({ id, videoPath, thumbnailSrc }) => (
          <div style={{ width: "450px" }} key={id}>
            <Video
              id={id}
              videoPath={videoPath}
              thumbnailSrc={thumbnailSrc}
              frameColor={"black"}
            />
          </div>
        ))}
      </RecentVideosContainer> */}
    </ScrollingTextContainer>
  );
}

export default ScrollingText;
