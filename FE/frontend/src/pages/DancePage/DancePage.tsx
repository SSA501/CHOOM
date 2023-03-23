import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import ResultPage from "../ResultPage/ResultPage";
import DanceCam from "../../components/DanceCam/DanceCam";
import DanceVideo from "../../components/DanceVideo/DanceVideo";
import { ShadowContainer } from "../../components/ShadowContainer/style";
import { DancePageContainer, SideInfoContainer } from "./style";
import SideTitle from "../../components/SideTitle/SideTitle";
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

  return (
    <DancePageContainer>
      <SideInfoContainer>
        <SideTitle title={["챌린지", "연습하기✨"]}></SideTitle>
        <SideTitle title={["챌린지", "연습하기✨"]}></SideTitle>
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
