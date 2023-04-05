import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DanceChart from "../../components/DanceChart/DanceChart";
import Btn from "../Btn/Btn";
import DanceScore from "../DanceScore/DanceScore";
import { StyleContainer, DanceResultContainer } from "./style";
import { Score, Dance } from "../../constants/types";
import { createChallengeResult } from "../../apis/dance";

function DanceResult(props: {
  scoreList: Score[];
  score: number;
  danceVideoRef: React.MutableRefObject<any>;
  setMyUrl: (myUrl: string) => void;
  myUrl: string;
  dance: Dance;
  myBlob: Blob;
  imageFile?: File;
  isGuide: boolean;
  setIsGuide: (isGuide: boolean) => void;
}) {
  const navigate = useNavigate();
  const [myDanceId, setMyDanceId] = useState("");
  const [danceId, setDanceId] = useState();
  useEffect(() => {
    const uploaderString = JSON.stringify({
      danceId: props.dance.id,
      matchRate: JSON.stringify(props.scoreList),
      score: props.score,
      title: props.dance.title,
      videoLength: props.scoreList.length,
    });
    const jsonData = new Blob([uploaderString], { type: "application/json" });
    const videofile = new File([props.myBlob!], "videoFile.webm", {
      type: "video/webm",
    });
    const formData = new FormData();
    formData.append("addMyDanceRequestDto", jsonData);
    formData.append("videoFile", videofile);
    console.log(props.imageFile);
    formData.append("imageFile", props.imageFile!);
    createChallengeResult(formData)
      .then((res) => {
        console.log(res);
        setMyDanceId(res.data.id);
        setDanceId(res.data.danceId);
        props.setMyUrl(res.data.videoPath);
      })
      .catch((error) => {
        console.error(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackBtnClick = () => {
    props.setMyUrl("");
  };
  const goToChallenge = () => {
    navigate(`/detail/${danceId}`);
  };

  return (
    <DanceResultContainer>
      <StyleContainer>
        <DanceScore
          score={props.score}
          danceId={props.dance.id}
          title={props.dance.title}
          myDanceId={myDanceId}
        />
        <div style={{ display: "flex" }}>
          <DanceChart
            scoreList={props.scoreList}
            danceVideoRef={props.danceVideoRef}
            score={props.score}
            myUrl={props.myUrl}
            dance={props.dance}
            setIsGuide={props.setIsGuide}
            isGuide={props.isGuide}
            myDanceId={myDanceId}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Btn btnText={"챌린지 다시하기"} handleClick={handleBackBtnClick} />
          <Btn btnText={"챌린지 상세보기"} handleClick={goToChallenge} />
        </div>
      </StyleContainer>
    </DanceResultContainer>
  );
}

export default DanceResult;
