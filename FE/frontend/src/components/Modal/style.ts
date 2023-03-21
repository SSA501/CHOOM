import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.5;
  overflow: hidden;
  z-index: 999;
`;

const Modal = styled.div<{ width: number; height: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  z-index: 999;
  background-color: white;
  border: 4px solid black;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const ModalTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 40px;
  text-align: center;
  color: black;
  padding-block: 50px;
`;

const ModalContent = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  padding-block: 50px;
`;

const BtnDiv = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;

  & > span {
    font-size: 26px;
  }
`;

const AcceptBtn = styled.button`
  width: 112.4px;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #ce2222;
`;

const CancelBtn = styled.button`
  width: 112.4px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #3a3a3a;
`;

const LogoImg = styled.img`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 24px;
  margin-top: 87px;
`;

export {
  Background,
  Modal,
  CloseBtn,
  ModalTitle,
  ModalContent,
  BtnDiv,
  AcceptBtn,
  CancelBtn,
  LogoImg,
};
