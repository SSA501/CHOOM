import React, { useState } from "react";
import {
  CircleBtnContainer,
  CircleIconBtn,
  CircleBtnLabel,
  Icon,
} from "./style";

function TimerBtn(props: {
  time?: number;
  disabled?: string;
  img?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [color, setColor] = useState("purple");

  const hadleOverBtn = () => {
    setColor("white");
  };
  const hadleOutBtn = () => {
    setColor("purple");
  };
  return (
    <CircleBtnContainer>
      {props.disabled ? (
        <CircleIconBtn disabled>
          <Icon src={"/assets/icon_sec2_gray.png"} alt="이미지" height="45px" />
        </CircleIconBtn>
      ) : (
        <CircleIconBtn
          onClick={props.onClick}
          onMouseOver={hadleOverBtn}
          onMouseOut={hadleOutBtn}
        >
          <Icon
            src={"/assets/icon_sec" + props.time + "_" + color + ".png"}
            alt="이미지"
            height="45px"
          />
        </CircleIconBtn>
      )}
      <CircleBtnLabel disabled={props.disabled}>타이머</CircleBtnLabel>
    </CircleBtnContainer>
  );
}

export default TimerBtn;
