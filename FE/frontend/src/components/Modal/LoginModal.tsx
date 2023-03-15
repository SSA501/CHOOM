import React, { useRef, useEffect} from 'react'
import Btn from '../Btn/Btn';
import { Modal, CloseBtn, ModalTitle, BtnDiv, LogoImg } from './style';
import { IoCloseSharp } from 'react-icons/io5';

function LoginModal(props: { setLoginModalOpen: (loginModalOpen:boolean) => void; }) {
    const closeModal = () => {
        props.setLoginModalOpen(false);
    };

    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as Node;
            if (modalRef.current && !modalRef.current.contains(target)) {
              props.setLoginModalOpen(false);
            }
          };

        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    const loginGoogle = () => {
        alert("구글 로그인");
    }
    const loginKaKao = () => {
        alert("카카오 로그인");
    }
    const loginTiktok = () => {
        alert("틱톡 로그인");
    }

    return (
        <Modal ref={modalRef} width={500} height={400}>
            <CloseBtn onClick={closeModal}><IoCloseSharp fontSize="30px"/></CloseBtn>
            <ModalTitle>LOGIN</ModalTitle>
            <BtnDiv>
                <Btn login loginType={"google"} handleClick={loginGoogle}>구글로그인</Btn>
                <Btn login loginType={"kakao"} handleClick={loginKaKao}>카카오로그인</Btn>
                <Btn login loginType={"tiktok"} handleClick={loginTiktok}>틱톡로그인</Btn>
            </BtnDiv>
            <LogoImg src="/assets/logo.png" alt="로고이미지"/>
        </Modal>
    );
}

export default LoginModal;