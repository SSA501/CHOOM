import styled from "styled-components";

const DanceVideoContainer = styled.div`
  width: 50%;
  height: calc(100% - 10px);
  float: right;
  position: relative;
`;

const CamContainer = styled.video`
  position: absolute;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CanvasContainer = styled.canvas`
  position: absolute;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CircleBtnLabel = styled.div<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(50% + 230px);
  font-size: 16px;
  width: 80px;
  text-align: center;
  color: var(--blue-color);
`;
const CircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(50% + 240px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #fff;
  color: var(--blue-color);
  border: 2px solid var(--blue-color);
  font-size: 20px;
  text-align: center;
  line-height: 15px;
  text-decoration: none;

  & > svg {
    font-size: 28px;
  }
  &:hover {
    color: #fff;
    background-color: var(--blue-color);
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
