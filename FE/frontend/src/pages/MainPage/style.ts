import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    /* opacity: 0; */
    transform: translateY(50px);
  }
  to {
    /* opacity: 1; */
    transform: none;
  }
`;

const AnimatedComponent = styled.div<{ isVisible: boolean }>`
  animation: ${(props) =>
    props.isVisible &&
    css`
      ${fadeIn} 1s ease-in-out
    `};
`;

const TopContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

export { AnimatedComponent, TopContainer };
