import styled from "styled-components";

const Modal = styled.div<{ width:number, height:number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.width}px;
    height: ${props => props.height}px;
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
    @import url('https://fonts.cdnfonts.com/css/libre-baskerville');
    font-family: 'Libre Baskerville', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    line-height: 40px;  
    text-align: center; 
    color: black;
    padding-block: 50px;
`;

const ModalContent = styled.p`
    font-family: 'Pretendard';
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
`;

const AcceptBtn = styled.button`
    width: 112.4px;
    font-family: 'Libre Baskerville';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    color: #CE2222;
`;

const CancelBtn = styled.button`
    width: 112.4px;
    font-family: 'Libre Baskerville';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    color: #3A3A3A;
`;

const LogoImg = styled.img`
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translate(-50%, 0);
    height: 24px;
    margin-top: 87px;
`;

export { Modal, CloseBtn, ModalTitle, ModalContent, BtnDiv, AcceptBtn, CancelBtn, LogoImg }