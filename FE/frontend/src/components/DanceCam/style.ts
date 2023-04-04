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
  position: absolute;
  top: 20px;
  right: 90px;
  width: 100px;
  text-align: center;
  color: red;
  font-weight: 900;

  -webkit-animation: blink 0.7s ease-in-out infinite alternate;
  -moz-animation: blink 0.7s ease-in-out infinite alternate;
  animation: blink 0.7s ease-in-out infinite alternate;

  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & > svg {
    cursor: default !important  ;
    color: red;
  }
`;

export { CamContainer, MyCam, MyCanvas, Rec };
