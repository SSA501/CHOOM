import { title } from "process";
import React, { useState } from "react";
import MyDance from "../../components/MyDance/MyDance";
import MyImg from "../../components/MyImg/MyImg";
import { MyDanceContainer, DancePageContainer, TitleContainer } from "./style";

function DancePage() {
  const [title, setTitle] = useState<string>("이미지가 없습니다");
  return (
    <DancePageContainer>
      <TitleContainer>{title}</TitleContainer>
      <MyDanceContainer type="left">
        <MyImg setTitle={(title: string) => setTitle(title)} />
      </MyDanceContainer>
      <MyDanceContainer type="right">
        <MyDance />
      </MyDanceContainer>
    </DancePageContainer>
  );
}

export default DancePage;
