import React, { useState } from "react";
import MyDance from "../../components/MyDance/MyDance";
import MyImg from "../../components/MyImg/MyImg";
import { MyDanceContainer, DancePageContainer, TitleContainer } from "./style";
interface Kpt {
  x: number;
  y: number;
  z: number;
  score: number;
}
interface Pose {
  keypoints: Kpt[];
}
function DancePage() {
  const [title, setTitle] = useState<string>("이미지가 없습니다");
  const [poses, setPoses] = useState<Pose[]>([]);
  return (
    <DancePageContainer>
      <TitleContainer>{title}</TitleContainer>
      <MyDanceContainer type="left">
        <MyImg
          setTitle={(title: string) => setTitle(title)}
          setPoses={(poses: Pose[]) => setPoses(poses)}
        />
      </MyDanceContainer>
      <MyDanceContainer type="right">
        <MyDance poses={poses} />
      </MyDanceContainer>
    </DancePageContainer>
  );
}

export default DancePage;
