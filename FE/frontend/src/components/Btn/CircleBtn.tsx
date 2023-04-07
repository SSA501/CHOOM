import React from "react";
import { IconType } from "react-icons/lib";
import { CircleBtnContainer, CircleIconBtn, CircleBtnLabel } from "./style";

function CircleBtn(props: {
  icon: IconType;
  label?: string;
  color?: string;
  disabled?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <CircleBtnContainer>
      {props.disabled === "disabled" ? (
        <CircleIconBtn disabled>
          <props.icon />
        </CircleIconBtn>
      ) : (
        <CircleIconBtn onClick={props.onClick} color={props.color}>
          <props.icon />
        </CircleIconBtn>
      )}
      <CircleBtnLabel disabled={props.disabled}>{props.label}</CircleBtnLabel>
    </CircleBtnContainer>
  );
}

export default CircleBtn;
