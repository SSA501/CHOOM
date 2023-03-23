import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import ResultPage from "../ResultPage/ResultPage";
import DanceCam from "../../components/DanceCam/DanceCam";
import DanceVideo from "../../components/DanceVideo/DanceVideo";
import { ShadowContainer } from "../../components/ShadowContainer/style";
import { DancePageContainer, SideInfoContainer } from "./style";
import SideTitle from "../../components/SideTitle/SideTitle";
import SideSubTitle from "../../components/SideSubTitle/SideSubTitle";
interface Kpt {
  x: number;
  y: number;
  z: number;
  score: number;
}
interface Pose {
  keypoints: Kpt[];
}
interface Score {
  score: number;
  time: number;
}
function DancePage() {
  const [poseList, setPoseList] = useState<Pose[]>(
    JSON.parse(localStorage.getItem("poseList") || "[]")
  );
  const [scoreList, setScoreList] = useState<Score[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const danceVideoRef = useRef<any>();

  const contents = [
    "1️⃣ 알아서 잘해보세요",
    "2️⃣ 어쩌라고요",
    "3️⃣ 그냥 녹화하면 됩니다^^",
  ];

  return (
    <DancePageContainer>
      <SideInfoContainer>
        <SideTitle title={["챌린지", "연습하기🏆"]}></SideTitle>
        <SideSubTitle title="챌린지 연습 방법 ❓" contents={contents} />
      </SideInfoContainer>
      <Routes>
        <Route
          path=""
          element={
            <ShadowContainer
              padding="8px"
              margin="8px 16px 16px 8px"
              display="flex"
              justifyContent="space-evenly"
              flexWrap="wrap"
            >
              <DanceVideo
                setPoseList={setPoseList}
                poseList={poseList}
                ref={danceVideoRef}
              />
              <DanceCam
                poseList={poseList}
                danceVideoRef={danceVideoRef}
                setScoreList={setScoreList}
                setVideoUrl={setVideoUrl}
              />
            </ShadowContainer>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/result"
          element={<ResultPage scoreList={scoreList} videoUrl={videoUrl} />}
        />
      </Routes>
    </DancePageContainer>
  );
}

export default DancePage;
