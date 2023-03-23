import styled from "styled-components";

const DanceVideoContainer = styled.div`
  height: 800px;
  width: 550px;
  position: relative;
`;

const VideoContainer = styled.video<{ isFlipped: Boolean }>`
  position: absolute;
  border-radius: 1rem;
  transform: ${(props) => (props.isFlipped ? "scaleX(-1)" : "")};
`;

const CircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: 465px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: white;
  color: black;
  border: 2px solid black;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  & > svg {
    font-size: 28px;
  }
  &:hover {
    background-color: black;
    color: white;
  }
`;

const BtnLabel = styled.div<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: 455px;
  font-size: 16px;
  width: 80px;
  text-align: center;
  color: black;
`;
export { DanceVideoContainer, VideoContainer, CircleBtn, BtnLabel };
