import React from 'react'
import { BtnLogin, Icon, BtnNomal } from './style';

type BtnProps = {
    login?: boolean;
    loginType?: "kakao" | "google" | "tiktok";
    background?: "blue" | "yellow";
    children: string;
    handleClick: () => void;
  };
  
function Btn(props: BtnProps) {
    return (
        props.login ?
            <BtnLogin loginType={props.loginType} onClick={props.handleClick} >
                <Icon src={`/assets/icon_${props.loginType}.png`} alt="이미지" height="22px"/>
                <p>
                    {props.loginType === "kakao" ? "카카오 " : props.loginType === "google" ? "구글 " : "틱톡 "}
                    로그인
                </p>
            </BtnLogin >
            : <BtnNomal background={props.background} onClick={props.handleClick} >{props.children}</BtnNomal >
            );
};
    
export default Btn