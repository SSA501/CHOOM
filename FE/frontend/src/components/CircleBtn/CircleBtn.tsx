import React from "react";
import { IconType } from "react-icons/lib";
import { Icon } from "../Btn/style";
import { Btn, BtnLabel, BtnContainer } from "./style";

function CircleBtn(props: {
  icon: IconType | string;
  label?: string;
  disabled?: string;
  size?: string;
  img?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <BtnContainer size={props.size}>
      {props.disabled === "disabled" ? (
        <Btn disabled>
          {typeof props.icon === "string" ? (
            <Icon
              src={`/assets/icon_${props.icon}.png`}
              alt="이미지"
              height="45px"
            />
          ) : (
            <props.icon />
          )}
        </Btn>
      ) : (
        <Btn onClick={props.onClick} icon={props.icon}>
          {typeof props.icon === "string" ? (
            <Icon
              src={`/assets/icon_${props.icon}.png`}
              alt="이미지"
              height="45px"
            />
          ) : (
            <props.icon />
          )}
        </Btn>
      )}
      <BtnLabel disabled={props.disabled} icon={props.icon}>
        {props.label}
      </BtnLabel>
    </BtnContainer>
  );
}

export default CircleBtn;
