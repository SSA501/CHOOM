import React, { useEffect } from "react";
import DanceChart from "../../components/DanceChart/DanceChart";
import Btn from "../Btn/Btn";
import DanceScore from "../DanceScore/DanceScore";
import { StyleContainer } from "./style";
import { Score, Dance } from "../../constants/types";
import { createChallengeResult } from "../../apis/dance";

function DanceResult(props: {
  scoreList: Score[];
  score: number;
  danceVideoRef: React.MutableRefObject<any>;
  setMyUrl: (myUrl: string) => void;
  dance: Dance;
  myBlob: Blob;
}) {
  useEffect(() => {
    const uploaderString = JSON.stringify({
      danceId: props.dance.id,
      matchRate: props.scoreList,
      score: props.score,
      title: props.dance.title,
      videoLength: 0,
    });
    const jsonData = new Blob([uploaderString], { type: "application/json" });
    const videofile = new File([props.myBlob!], "videoFile", {
      type: "video/webm",
    });
    const formData = new FormData();

    formData.append(
      "addMyDanceRequestDto",
      uploaderString,
      "addMyDanceRequestDto"
    );
    formData.append("videoFile", videofile);
    createChallengeResult(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    props.dance.id,
    props.scoreList,
    props.score,
    props.dance.title,
    props.myBlob,
  ]);

  const handleBackBtnClick = () => {
    props.setMyUrl("");
  };

  return (
    <StyleContainer>
      <DanceScore score={props.score} title={props.dance.title} />
      <DanceChart
        scoreList={props.scoreList}
        danceVideoRef={props.danceVideoRef}
      />
      <Btn btnText={"챌린지 다시하기"} handleClick={handleBackBtnClick} />
    </StyleContainer>
  );
}

export default DanceResult;
