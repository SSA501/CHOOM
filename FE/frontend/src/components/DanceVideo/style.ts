import styled, { css } from "styled-components";

const ChallengeVideo = styled.video<{ isGuide?: boolean }>`
  border-radius: 1rem;
`;
const ResultVideo = styled.video<{ isGuide?: boolean }>`
  border-radius: 1rem;
  ${(props) =>
    !props.isGuide &&
    css`
      transform: scale(-1, 1);
      &::-webkit-media-controls-panel {
        transform: scale(-1, 1);
      }
    `};
`;

export { ChallengeVideo, ResultVideo };
