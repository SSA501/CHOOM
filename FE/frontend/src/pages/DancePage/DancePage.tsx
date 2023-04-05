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
  const [imageFile, setimageFile] = useState<File>();
  const [myBlob, setMyBlob] = useState<Blob>();
  const [challenge, setChallenge] = useState<Challenge>();
  const [dance, setDance] = useState<Dance>();
  const [isGuide, setIsGuide] = useState(false);
  const [scoreList, setScoreList] = useState<Score[]>([]);
  const [score, setScore] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const danceVideoRef = useRef<any>();
  const { danceId } = useParams();

  const practiceContents = [
    { icon: "1️⃣", text: "영상을 보면서 연습하세요" },
    { icon: "2️⃣", text: "녹화버튼 누르고 챌린지영상을 따라해보세요" },
    { icon: "3️⃣", text: "결과를 확인하세요" },
  ];

  const resultContents = [
    { icon: "1️⃣", text: "그래프를 통해 어디가 틀렸는지 확인해보세요" },
    { icon: "2️⃣", text: "챌린지 다시하기를 통해 다시 도전해보세요" },
    { icon: "3️⃣", text: "공유하기로 친구에게 자랑해보세요" },
  ];

  // 모델 불러오기
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "챌린지 연습 - CHOOM";

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
    if (poseList.length > 0) {
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
          <SideSubTitle title="챌린지 결과 설명 ❓" contents={resultContents} />
        </SideInfoContainer>
      ) : (
        <SideInfoContainer>
          <SideTitle title={["챌린지", "연습하기🏆"]}></SideTitle>
          <SideSubTitle
            title="챌린지 연습 설명 ❓"
            contents={practiceContents}
          />
        </SideInfoContainer>
      )}
      <ShadowContainer
        padding="8px"
        margin="8px 16px 16px 8px"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        minHeight="800px"
      >
        {loading ? (
          <SpinModal />
        ) : (
          <>
            <DanceVideo
              setPoseList={setPoseList}
              poseList={poseList}
              ref={danceVideoRef}
              detector={detector!}
              myUrl={myUrl}
              myGuideUrl={myGuideUrl}
              isGuide={isGuide}
              challenge={challenge}
            />
            {myUrl?.length > 0 ? (
              <DanceResult
                scoreList={scoreList}
                danceVideoRef={danceVideoRef}
                setMyUrl={setMyUrl}
                score={score}
                dance={dance!}
                myUrl={myUrl}
                myBlob={myBlob!}
                imageFile={imageFile}
                setIsGuide={setIsGuide}
                isGuide={isGuide}
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
                setimageFile={setimageFile}
              />
            )}
          </>
        )}
      </ShadowContainer>
    </DancePageContainer>
  );
}

export default DancePage;
