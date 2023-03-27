import React, { useRef, useEffect } from "react";
import Btn from "../Btn/Btn";
import {
  Background,
  Modal,
  CloseBtn,
  ModalTitle,
  BtnDiv,
  LogoImg,
} from "./style";
import { CgClose } from "react-icons/cg";
import { ShadowContainer } from "../ShadowContainer/style";
import { redirectKakao } from "../../apis/api";

interface LoginModalProps {
  setIsLogin: (isLogin: boolean) => void;
  setLoginModalOpen: (loginModalOpen: boolean) => void;
}

function LoginModal({ setIsLogin, setLoginModalOpen }: LoginModalProps) {
  const closeModal = () => {
    setLoginModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setLoginModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLoginGoogle = () => {
    // TODO: 구글 로그인 기능 구현
    closeModal();
    setIsLogin(true);
  };
  const handleLoginTiktok = () => {
    // TODO: 틱톡 로그인 기능 구현
    closeModal();
    setIsLogin(true);
  };

  const handleLoginKaKao = () => {
    redirectKakao();
    closeModal();
  };

  return (
    <div>
      <Background />
      <Modal ref={modalRef} width={"500px"} height={"400px"}>
        <ShadowContainer
          width={"500px"}
          height={"400px"}
          bgColor={"white"}
          padding={"3em 0px"}
        >
          <CloseBtn onClick={closeModal}>
            <CgClose fontSize="30px" />
          </CloseBtn>
          <ModalTitle>LOGIN</ModalTitle>
          <BtnDiv>
            <Btn login loginType={"google"} handleClick={handleLoginGoogle} />
            <Btn login loginType={"tiktok"} handleClick={handleLoginTiktok} />
            <Btn login loginType={"kakao"} handleClick={handleLoginKaKao} />
          </BtnDiv>
          <LogoImg src="/assets/logo.png" alt="logo" />
        </ShadowContainer>
      </Modal>
    </div>
  );
}

export default LoginModal;
