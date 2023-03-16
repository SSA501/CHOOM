import styled, { css } from "styled-components";

const VideoContainer = styled.div<{ bgFrame?: string }>`
  ${({ bgFrame }) => css`
    width: ${bgFrame ? "366px" : "334px"};
    height: ${bgFrame ? "626px" : "594px"};
    border: ${bgFrame ? `1em solid var(--${bgFrame}-color)` : null};
  `}
`;

export { VideoContainer };
