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
`;

const Rec = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;
  & > svg {
    cursor: default !important  ;
    color: red;
  }
`;

export { CamContainer, MyCam, MyCanvas, Rec };
