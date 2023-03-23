import React from "react";
import { LoginBtn, Icon, NomalBtn } from "./style";

type BtnProps = {
  login?: boolean;
  loginType?: "kakao" | "google" | "tiktok";
  btnText?: string;
  handleClick: () => void;
};

function Btn(props: BtnProps) {
  return props.login ? (
    <LoginBtn loginType={props.loginType} onClick={props.handleClick}>
      <Icon
        src={`/assets/icon_${props.loginType}.png`}
        alt="이미지"
        height="45px"
      />
    </LoginBtn>
  ) : (
    <NomalBtn onClick={props.handleClick}>{props.btnText}</NomalBtn>
  );
}

export default Btn;
