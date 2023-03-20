import styled, { keyframes } from "styled-components";

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
  padding: 0.5em 0;
  color: white;
  text-transform: uppercase;
  overflow-x: hidden;
`;

const FlowText = styled.div`
  white-space: nowrap;
  animation: ${flowAnimation} 20s linear infinite;
`;

export { FlowTextContainer, FlowText };
