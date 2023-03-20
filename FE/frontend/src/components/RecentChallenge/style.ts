import styled, { keyframes } from "styled-components";

const RecentChallengeContainer = styled.div`
  padding: 2em 0;
`;

const flowAnimation = keyframes`
  from {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  to {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
`;

const FlowTextContainer = styled.div`
  background-color: var(--blue-color);
  padding: 1em 0;
  color: white;
  text-transform: uppercase;
  overflow-x: hidden;
`;

const FlowText = styled.div`
  white-space: nowrap;
  animation: ${flowAnimation} 20s linear infinite;
`;

const RecentVideosContainer = styled.div`
  padding: 3em 5em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  row-gap: 3em;
  justify-items: center;
`;

export {
  RecentChallengeContainer,
  FlowTextContainer,
  FlowText,
  RecentVideosContainer,
};
