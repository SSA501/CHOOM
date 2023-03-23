import ReactPlayer from "react-player";
import styled, { css } from "styled-components";

interface VideoContainerProps {
  bgFrame?: string;
  ratio: number;
}

const VideoContainer = styled.div<VideoContainerProps>`
  ${({ bgFrame, ratio }) => css`
    position: relative;
    width: 100%;
    /* width: ${bgFrame ? "" : ""};
    height: ${bgFrame ? "626px" : "594px"}; */
    border: ${bgFrame ? `12px solid var(--${bgFrame}-color)` : null};
    padding-top: ${ratio
      ? `${ratio}%`
      : "56.25%"}; /* default aspect ratio is 16:9 */
  `}
`;

const ReactPlayerStyled = styled(ReactPlayer)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ThumbnailImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export { VideoContainer, ReactPlayerStyled, ThumbnailImg };
