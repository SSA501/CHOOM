import React from "react";
import { TitleContainer, TitleBar, TitleText } from "./style";

function SideSubTitle(props: { title: string; contents: string[] }) {
  return (
    <TitleContainer>
      <TitleText>{props.title}</TitleText>
      <TitleBar />
      {props.contents.map((content) => {
        return <TitleText>{content}</TitleText>;
      })}
    </TitleContainer>
  );
}

export default SideSubTitle;
