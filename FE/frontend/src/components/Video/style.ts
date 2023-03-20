import ReactPlayer from "react-player";
import styled, { css } from "styled-components";

interface VideoContainerProps {
  frameColor?: string;
  ratio: number;
}

const VideoContainer = styled.div<VideoContainerProps>`
  ${({ frameColor, ratio }) => css`
    position: relative;
    width: 100%;
    /* height: ${frameColor ? "626px" : "594px"}; */
    border: ${frameColor ? `14px solid var(--${frameColor}-color)` : null};
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
