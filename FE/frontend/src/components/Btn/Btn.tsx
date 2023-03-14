import React from 'react'
import styled from 'styled-components'

type BtnProps = {
    login?: boolean;
    loginType?: "kakao" | "google" | "tiktok";
    children: string;
    handleClick: () => void;
  };
  
const BtnLogin = styled.button`
    width: 115px;
    height: 150px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: var(--yellow-color);
`;

const BtnNomal = styled.button`
    width: 184px;
    height: 67px;
    background-color: var(--blue-color);
    font-size: 28px;
    font-weight: 700;
    color: white;
    border-radius: 25px;
`;

const Btn = (props: BtnProps) => {
    return (
        props.login ?
            <BtnLogin onClick={props.handleClick} >
                <img src={`/assets/logo_${props.loginType}.png`} alt="login logo" />
                <p>
                    {props.loginType === "kakao" ? "카카오 " : props.loginType === "google" ? "구글 " : "틱톡 "}
                    로그인
                </p>
            </BtnLogin >
            : <BtnNomal onClick={props.handleClick} >{props.children}</BtnNomal >
            );
};
    
export default Btn