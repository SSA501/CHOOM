import React from "react";
import CircleBtn from "../CircleBtn/CircleBtn";
import {
  TitleContainer,
  TitleBar,
  TitleText,
  ContentsContainer,
} from "./style";

function SideSubTitle(props: { title: string; contents?: string[] }) {
  return (
    <TitleContainer>
      <TitleText>{props.title}</TitleText>
      <TitleBar />
      {props.contents ? (
        props.contents?.map((content, i) => {
          return <TitleText key={i}>{content}</TitleText>;
        })
      ) : (
        <ContentsContainer>
          <CircleBtn icon="kakao" label="다운로드" size="big" />
          <CircleBtn icon="tiktok" label="다운로드" size="big" />
          <CircleBtn icon="youtube_shorts" label="다운로드" size="big" />
          <CircleBtn icon="download" label="다운로드" size="big" />
        </ContentsContainer>
      )}
    </TitleContainer>
  );
}

export default SideSubTitle;
