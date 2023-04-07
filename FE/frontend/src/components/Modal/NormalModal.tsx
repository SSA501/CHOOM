import React, { useRef, useEffect } from "react";
import { ShadowContainer } from "../ShadowContainer/style";
import {
  Background,
  Modal,
  ModalContent,
  BtnDiv,
  AcceptBtn,
  CancelBtn,
  LogoImg,
} from "./style";

function NormalModal(props: {
  modalText: string;
  setNormalModalOpen: (normalModalOpen: boolean) => void;
  acceptModal: () => void;
}) {
  const closeModal = () => {
    props.setNormalModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const acceptModal = () => {
    props.acceptModal();
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div>
      <Background />
      <Modal ref={modalRef} width={"400px"} height={"300px"}>
        <ShadowContainer
          width={"400px"}
          height={"300px"}
          bgColor={"white"}
          padding={"3em 0px"}
        >
          <ModalContent>{props.modalText}</ModalContent>
          <BtnDiv>
            <CancelBtn onClick={closeModal}>No</CancelBtn>
            <span>/</span>
            <AcceptBtn onClick={acceptModal}>Yes</AcceptBtn>
          </BtnDiv>
          <LogoImg src="/assets/logo.png" alt="로고이미지" />
        </ShadowContainer>
      </Modal>
    </div>
  );
}

export default NormalModal;
