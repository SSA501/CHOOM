import styled from "styled-components";

const DanceVideoContainer = styled.div`
  height: 800px;
  width: 600px;
  position: relative;
`;

const CamContainer = styled.video`
  position: absolute;
  border-radius: 1rem;
`;
const CanvasContainer = styled.canvas`
  position: absolute;
  border-radius: 1rem;
`;

const CircleBtnLabel = styled.div<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: 455px;
  font-size: 16px;
  width: 80px;
  text-align: center;
  color: black;
`;
const CircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: 465px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #fff;
  color: black;
  border: 2px solid black;
  font-size: 20px;
  text-align: center;
  line-height: 15px;
  text-decoration: none;

  & > svg {
    font-size: 28px;
  }
  &:hover {
    color: #fff;
    background-color: black;
  }
`;

const ClickedCircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(50% + 240px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: var(--blue-color);
  color: #fff;
  border: 2px solid var(--blue-color);
  font-size: 20px;
  text-align: center;
  line-height: 15px;
  text-decoration: none;

  & > svg {
    font-size: 28px;
  }
`;

export {
  DanceVideoContainer,
  CamContainer,
  CanvasContainer,
  CircleBtn,
  CircleBtnLabel,
  ClickedCircleBtn,
};
