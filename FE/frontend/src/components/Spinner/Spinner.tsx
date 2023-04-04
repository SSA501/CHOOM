import React from "react";
import { SpinnerContainer } from "./style";

interface SpinnerProps {
  text?: string;
}

function Spinner({ text }: SpinnerProps) {
  return (
    <SpinnerContainer>
      <img src="/assets/images/dancegirl.gif" alt="대기중" />
      <p>{text}</p>
    </SpinnerContainer>
  );
}

export default Spinner;
