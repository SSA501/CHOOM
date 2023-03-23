import ReactPlayer from "react-player";
import styled, { css } from "styled-components";

interface VideoContainerProps {
  frameColor?: string;
  ratio: number;
}

const VideoContainer = styled.div<VideoContainerProps>`
  ${({ frameColor, ratio }) => css`
    width: 270px;
    height: 480px;
    /* height: ${frameColor ? "626px" : "594px"}; */
    /* border: ${frameColor
      ? frameColor === "black"
        ? "14px solid black"
        : `14px solid var(--${frameColor}-color)`
      : null}; */
    /* padding-top: ${ratio
      ? `${ratio}%`
      : "56.25%"}; default aspect ratio is 16:9 */
  `}
  iframe {
    width: 270px;
    height: 480px;
    border-radius: 1rem;
  }

  img {
    width: 100%;
    border-radius: 1rem;
  }
`;

export { VideoContainer };
