import React, { useState, useRef, useEffect } from "react";
import DanceResult from "../../components/DanceReult/DanceResult";
import DanceCam from "../../components/DanceCam/DanceCam";
import DanceVideo from "../../components/DanceVideo/DanceVideo";
import { ShadowContainer } from "../../components/ShadowContainer/style";
import { DancePageContainer, SideInfoContainer } from "./style";
import SideTitle from "../../components/SideTitle/SideTitle";
import SideSubTitle from "../../components/SideSubTitle/SideSubTitle";
import * as poseDetection from "@tensorflow-models/pose-detection";
import SpinModal from "../../components/Modal/SpinModal";

interface Pose {
  keypoints: poseDetection.Keypoint[];
}
interface Score {
  score: number;
  time: number;
}

function DancePage() {
  const [poseList, setPoseList] = useState<Pose[]>([]);
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();
  const [myUrl, setMyUrl] = useState<string>("");
  const [scoreList, setScoreList] = useState<Score[]>([]);
  const [score, setScore] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
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
    document.body.style.overflow = "hidden";
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: "mediapipe" as "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
    };
    const createdDetector = await poseDetection.createDetector(
      model,
      detectorConfig
    );
    await createdDetector.estimatePoses(new ImageData(450, 800));
    setloading(false);
    document.body.style.overflow = "auto";
    setDetector(createdDetector);
  };

  return (
    <DancePageContainer>
      {loading && <SpinModal />}
      {myUrl?.length > 0 ? (
        <SideInfoContainer>
          <SideTitle title={["챌린지", "결과보기🎉"]}></SideTitle>
          <SideSubTitle
            title="소셜 공유 & 다운로드"
            score={score}
            videoTitle={title}
            myUrl={myUrl}
          />
        </SideInfoContainer>
      ) : (
        <SideInfoContainer>
          <SideTitle title={["챌린지", "연습하기🏆"]}></SideTitle>
          <SideSubTitle title="챌린지 연습 방법 ❓" contents={contents} />
        </SideInfoContainer>
      )}
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
          myUrl={myUrl}
          setTitle={setTitle}
        />

        {myUrl?.length > 0 ? (
          <DanceResult
            scoreList={scoreList}
            danceVideoRef={danceVideoRef}
            setMyUrl={setMyUrl}
            score={score}
            title={title}
          />
        ) : (
          <DanceCam
            danceVideoRef={danceVideoRef}
            detector={detector!}
            poseList={poseList}
            myUrl={myUrl}
            setMyUrl={setMyUrl}
            setScoreList={setScoreList}
            setScore={setScore}
          />
        )}
      </ShadowContainer>
    </DancePageContainer>
  );
}

export default DancePage;
