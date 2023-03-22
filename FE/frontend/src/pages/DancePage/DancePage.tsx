import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import ResultPage from "../ResultPage/ResultPage";
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
  const [scoreList, setScoreList] = useState<number[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const danceVideoRef = useRef<any>();

  return (
    <div>
      <Routes>
        <Route
          path=""
          element={
            <DancePageContainer>
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
            </DancePageContainer>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/result"
          element={<ResultPage scoreList={scoreList} videoUrl={videoUrl} />}
        />
      </Routes>
    </div>
  );
}

export default DancePage;
