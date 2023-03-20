import React, { useRef, useEffect } from "react";
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
  setNormalModalOpen: (normalModalOpen: boolean) => void;
  acceptModal: () => void;
}) {
  const closeModal = () => {
    props.setNormalModalOpen(false);
  };

  const acceptModal = () => {
    props.acceptModal();
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        props.setNormalModalOpen(false);
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
      <Modal ref={modalRef} width={400} height={300}>
        <ModalContent>정말 탈퇴할까요?</ModalContent>
        <BtnDiv>
          <CancelBtn onClick={closeModal}>No</CancelBtn>
          <span>/</span>
          <AcceptBtn onClick={acceptModal}>Yes</AcceptBtn>
        </BtnDiv>
        <LogoImg src="/assets/logo.png" alt="로고이미지" />
      </Modal>
    </div>
  );
}

export default NormalModal;
