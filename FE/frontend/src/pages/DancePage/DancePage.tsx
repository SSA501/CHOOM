import React, { useState } from "react";
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
  const [poses, setPoses] = useState<Pose[]>(
    JSON.parse(localStorage.getItem("poseList") || "[]")
  );

  return (
    <DancePageContainer>
      <TitleContainer>Hype Boy - New Jeans</TitleContainer>
      <DanceVideo setPoses={setPoses} />
      <DanceCam poses={poses} />
    </DancePageContainer>
  );
}

export default DancePage;
