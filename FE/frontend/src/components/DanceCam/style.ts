import styled from "styled-components";

const DanceVideoContainer = styled.div`
  width: 50%;
  height: calc(100% - 127px);
  float: right;
  position: relative;
`;

const CamContainer = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CanvasContainer = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StartBtn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`;

export { DanceVideoContainer, CamContainer, StartBtn, CanvasContainer };
