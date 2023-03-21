import styled from "styled-components";

const DanceVideoContainer = styled.div`
  width: 60%;
  height: calc(100% - 127px);
  float: right;
  position: relative;
`;

const CamContainer = styled.video`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
`;
const CanvasContainer = styled.canvas`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
`;

const CircleBtn = styled.button<{ left: string }>`
  position: absolute;
  top: 85%;
  left: calc(10% + ${(props) => props.left});
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  text-decoration: none;
  border: none;
  cursor: pointer;
`;

export { DanceVideoContainer, CamContainer, CanvasContainer, CircleBtn };
