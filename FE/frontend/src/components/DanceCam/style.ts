import styled from "styled-components";

const CamContainer = styled.div`
  position: relative;
  width: 450px;
  height: 800px;
`;

const MyCam = styled.video`
  position: absolute;
  border-radius: 1rem;
  transform: scale(-1, 1);
`;
const MyCanvas = styled.canvas`
  position: absolute;
  border-radius: 1rem;
  background-color: aliceblue;
`;

export { CamContainer, MyCam, MyCanvas };
