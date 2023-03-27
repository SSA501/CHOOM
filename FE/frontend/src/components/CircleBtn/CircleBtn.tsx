import React from "react";
import { IconType } from "react-icons/lib";
import { Btn, BtnLabel } from "./style";

function CircleBtn(props: {
  icon: IconType | string;
  label?: string;
  disabled?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div>
      {props.disabled === "disabled" ? (
        <Btn disabled>
          <props.icon />
        </Btn>
      ) : (
        <Btn onClick={props.onClick}>
          <props.icon />
        </Btn>
      )}
      <BtnLabel disabled={props.disabled}>{props.label}</BtnLabel>
    </div>
  );
}

export default CircleBtn;
