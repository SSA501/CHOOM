import React from "react";
import { FlowText, FlowTextContainer, ScrollingTextContainer } from "./style";

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
      {/* <RecentVideosContainer>
        {videoData?.map(({ id, videoSrc, thumbnailSrc }) => (
          <div style={{ width: "450px" }} key={id}>
            <Video
              id={id}
              videoSrc={videoSrc}
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
