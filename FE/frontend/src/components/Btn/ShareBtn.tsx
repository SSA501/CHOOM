import React from "react";
import { CircleBtnContainer, LoginBtn, Icon, CircleBtnLabel } from "./style";

function ShareBtn(props: {
  label?: "kakao" | "google" | "tiktok" | "youtube_shorts";
  size?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <CircleBtnContainer>
      <LoginBtn
        loginType={props.label}
        size={props.size}
        style={{ marginTop: "20px" }}
        onClick={props.onClick}
      >
        <Icon
          src={`/assets/icon_${props.label}.png`}
          alt="이미지"
          height="28px"
        />
      </LoginBtn>
      <CircleBtnLabel>
        {props.label === "kakao" ? "카톡 공유" : "유튜브"}
      </CircleBtnLabel>
    </CircleBtnContainer>
  );
}

export default ShareBtn;
