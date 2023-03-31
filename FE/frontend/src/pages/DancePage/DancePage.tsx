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
import { useParams } from "react-router-dom";
import { getChallengeStatus, updateChallenge } from "../../apis/dance";
import { getChallengeDetail } from "../../apis/challenge";
import { Pose, Score, Challenge, Dance } from "../../constants/types";

function DancePage() {
  const [poseList, setPoseList] = useState<Pose[]>([]);
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();
  const [myUrl, setMyUrl] = useState<string>("");
  const [myGuideUrl, setMyGuideUrl] = useState<string>("");
  const [myBlob, setMyBlob] = useState<Blob>();
  const [challenge, setChallenge] = useState<Challenge>();
  const [dance, setDance] = useState<Dance>();
  const [scoreList, setScoreList] = useState<Score[]>([]);
  const [score, setScore] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const danceVideoRef = useRef<any>();
  const { danceId } = useParams();

  const contents = [
    "1️⃣ 알아서 잘해보세요",
    "2️⃣ 어쩌라고요",
    "3️⃣ 그냥 녹화하면 됩니다^^",
  ];

  // 모델 불러오기
  useEffect(() => {
    createDetector();

    getChallengeStatus(danceId!)
      .then((res) => {
        console.log(res);
        setChallenge(res.data);
      })
      .catch((err) => console.log(err));

    getChallengeDetail(danceId!)
      .then((res) => {
        console.log(res);
        setDance(res.data.dance);
      })
      .catch((err) => console.log(err));
  }, [danceId]);

  // 분석 결과 저장
  useEffect(() => {
    if (poseList.length > 0 && challenge?.status === 0) {
      console.log("분석결과저장");
      const poseListJSON = JSON.stringify(poseList);
      const jsonFile = new File([poseListJSON], "data.json", {
        type: "application/json",
      });

      updateChallenge(danceId!, jsonFile)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [challenge?.status, danceId, poseList]);

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
      {myUrl?.length > 0 ? (
        <SideInfoContainer>
          <SideTitle title={["챌린지", "결과보기🎉"]}></SideTitle>
          <SideSubTitle
            title="소셜 공유 & 다운로드"
            score={score}
            myUrl={myUrl}
            dance={dance!}
          />
        </SideInfoContainer>
      ) : (
        <SideInfoContainer>
          <SideTitle title={["챌린지", "연습하기🏆"]}></SideTitle>
          <SideSubTitle
            title="챌린지 연습 방법 ❓"
            contents={contents}
            dance={dance!}
          />
        </SideInfoContainer>
      )}
      <ShadowContainer
        padding="8px"
        margin="8px 16px 16px 8px"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {loading ? (
          <SpinModal />
        ) : (
          <DanceVideo
            setPoseList={setPoseList}
            poseList={poseList}
            ref={danceVideoRef}
            detector={detector!}
            myUrl={myUrl}
            myGuideUrl={myGuideUrl}
            challenge={challenge}
          />
        )}

        {myUrl?.length > 0 ? (
          <DanceResult
            scoreList={scoreList}
            danceVideoRef={danceVideoRef}
            setMyUrl={setMyUrl}
            score={score}
            dance={dance!}
            myBlob={myBlob!}
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
            setMyBlob={setMyBlob}
            setMyGuideUrl={setMyGuideUrl}
          />
        )}
      </ShadowContainer>
    </DancePageContainer>
  );
}

export default DancePage;
