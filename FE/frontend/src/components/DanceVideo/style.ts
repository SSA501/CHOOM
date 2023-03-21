import styled from "styled-components";

const DanceVideoContainer = styled.div`
  width: 40%;
  height: calc(100% - 127px);
  float: left;
  position: relative;
`;

const VideoContainer = styled.video<{ isFlipped: Boolean }>`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%)
    ${(props) => (props.isFlipped ? "scaleX(-1)" : "")};
`;

const CircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(60% + 200px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #fff;
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
    background-color: var(--lightblue-color);
  }
`;
export { DanceVideoContainer, VideoContainer, CircleBtn };
