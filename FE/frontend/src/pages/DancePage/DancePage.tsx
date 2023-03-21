import React, { useState, useRef } from "react";
import DanceCam from "../../components/DanceCam/DanceCam";
import DanceVideo from "../../components/DanceVideo/DanceVideo";
import { DancePageContainer, TitleContainer } from "./style";
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
  const [poseList, setPoseList] = useState<Pose[]>(
    JSON.parse(localStorage.getItem("poseList") || "[]")
  );
  const danceVideoRef = useRef<any>();

  return (
    <DancePageContainer>
      <TitleContainer>Hype Boy - New Jeans</TitleContainer>
      <DanceVideo setPoseList={setPoseList} ref={danceVideoRef} />
      <DanceCam poseList={poseList} danceVideoRef={danceVideoRef} />
    </DancePageContainer>
  );
}

export default DancePage;
