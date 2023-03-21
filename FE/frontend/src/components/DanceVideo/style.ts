import styled from "styled-components";

const DanceVideoContainer = styled.div`
  width: 50%;
  height: calc(100% - 10px);
  float: left;
  position: relative;
`;

const VideoContainer = styled.video<{ isFlipped: Boolean }>`
  position: absolute;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${(props) => (props.isFlipped ? "scaleX(-1)" : "")};
`;

const CircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(50% + 240px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: white;
  color: var(--blue-color);
  border: 2px solid var(--blue-color);
  font-size: 20px;
  text-align: center;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  & > svg {
    font-size: 28px;
  }
  &:hover {
    background-color: var(--blue-color);
    color: white;
  }
`;

const BtnLabel = styled.div<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(50% + 230px);
  font-size: 16px;
  width: 80px;
  text-align: center;
  color: var(--blue-color);
`;
export { DanceVideoContainer, VideoContainer, CircleBtn, BtnLabel };
