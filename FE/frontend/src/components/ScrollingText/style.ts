import styled, { keyframes } from "styled-components";

const ScrollingTextContainer = styled.div`
  margin: 3em 0;
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
  background-color: black;
  padding: 1em 0;
  color: white;
  text-transform: uppercase;
  overflow-x: hidden;
  font-weight: 600;
`;

const FlowText = styled.div`
  white-space: nowrap;
  animation: ${flowAnimation} 20s linear infinite;
`;

const RecentVideosContainer = styled.div`
  padding: 3em 10em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  row-gap: 5em;
  justify-items: center;
`;

export {
  ScrollingTextContainer,
  FlowTextContainer,
  FlowText,
  RecentVideosContainer,
};
