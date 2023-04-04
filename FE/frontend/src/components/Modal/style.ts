import styled from "styled-components";

const Background = styled.div<{ opacity?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: ${(props) => props.opacity || "0.7"};
  overflow: hidden;
  z-index: 999;
`;

const Modal = styled.div<{ width: string; height: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: center;
  z-index: 999;
`;

const CloseBtn = styled.button<{ top?: string; right?: string }>`
  position: absolute;
  top: ${(props) => props.top || "25px"};
  right: ${(props) => props.right || "30px"};
`;

const ModalTitle = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: black;
`;

const ModalContent = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
`;

const BtnDiv = styled.div`
  width: 100%;
  padding-top: 55px;
  margin: auto;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;

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

const RankTopContainer = styled.div`
  padding: 0 0 1em;
  font-size: 1.8rem;
  font-weight: 600;
  img {
    border-radius: 50%;
    margin-bottom: 0.5em;
  }
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
  RankTopContainer,
};
