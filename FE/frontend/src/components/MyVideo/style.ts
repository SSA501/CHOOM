import styled from "styled-components";

const VideoContainer = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const MyCanvas = styled.canvas`
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

export { VideoContainer, StartBtn, MyCanvas };
