import React, { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import DanceCam from "../../components/DanceCam/DanceCam";
import DanceVideo from "../../components/DanceVideo/DanceVideo";
import { ShadowContainer } from "../../components/ShadowContainer/style";
import { DancePageContainer, SideInfoContainer } from "./style";
import SideTitle from "../../components/SideTitle/SideTitle";
import SideSubTitle from "../../components/SideSubTitle/SideSubTitle";
import * as poseDetection from "@tensorflow-models/pose-detection";

interface Pose {
  keypoints: poseDetection.Keypoint[];
}

function DancePage() {
  const [poseList, setPoseList] = useState<Pose[]>([]);
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();
  const danceVideoRef = useRef<any>();

  const contents = [
    "1️⃣ 알아서 잘해보세요",
    "2️⃣ 어쩌라고요",
    "3️⃣ 그냥 녹화하면 됩니다^^",
  ];

  // 모델 불러오기
  useEffect(() => {
    createDetector();
  }, []);

  const createDetector = async () => {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: "mediapipe" as "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
    };
    const createdDetector = await poseDetection.createDetector(
      model,
      detectorConfig
    );
    createdDetector.estimatePoses(new ImageData(450, 800));
    setDetector(createdDetector);
  };

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
                detector={detector!}
              />
              <DanceCam
                danceVideoRef={danceVideoRef}
                detector={detector!}
                poseList={poseList}
              />
            </ShadowContainer>
          }
        />
      </Routes>
    </DancePageContainer>
  );
}

export default DancePage;
