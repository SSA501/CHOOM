import styled, { css } from "styled-components";

const Msg = styled.div`
  position: absolute;
  top: 20px;
  left: 280px;
  width: 150px;
  padding: 15px 5px;
  border-radius: 15px;
  text-align: center;
  color: white;
  background-color: var(--darkgray-color);

  -webkit-animation: blink 0.7s ease-in-out infinite alternate;
  -moz-animation: blink 0.7s ease-in-out infinite alternate;
  animation: blink 0.7s ease-in-out infinite alternate;

  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

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

export { Msg, ChallengeVideo, ResultVideo };
