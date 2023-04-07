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
import { redirectGoogle, redirectKakao } from "../../apis/user";

interface LoginModalProps {
  setLoginModalOpen: (loginModalOpen: boolean) => void;
}

function LoginModal({ setLoginModalOpen }: LoginModalProps) {
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
    redirectGoogle();
    closeModal();
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
            {/* <Btn login loginType={"tiktok"} handleClick={handleLoginTiktok} /> */}
            <Btn login loginType={"kakao"} handleClick={handleLoginKaKao} />
          </BtnDiv>
          <LogoImg src="/assets/logo.png" alt="logo" />
        </ShadowContainer>
      </Modal>
    </div>
  );
}

export default LoginModal;
