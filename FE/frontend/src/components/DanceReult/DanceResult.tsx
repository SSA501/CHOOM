import React, { useEffect, useState } from "react";
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
  const [challengeTitle, setChallengeTitle] = useState(props.dance.title);
  useEffect(() => {
    let matchRate = "[";
    matchRate += props.scoreList.map((score) => {
      return score.score + ",";
    });
    matchRate = matchRate.substring(0, matchRate.length - 1) + "]";

    const uploaderString = JSON.stringify({
      danceId: props.dance.id,
      matchRate: matchRate,
      score: props.score,
      title: props.dance.title,
      videoLength: props.scoreList.length,
    });
    const jsonData = new Blob([uploaderString], { type: "application/json" });
    const videofile = new File([props.myBlob!], "videoFile", {
      type: "video/webm",
    });
    const formData = new FormData();
    formData.append("addMyDanceRequestDto", jsonData);
    formData.append("videoFile", videofile);
    createChallengeResult(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });

    setChallengeTitle(props.dance.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackBtnClick = () => {
    props.setMyUrl("");
  };

  return (
    <StyleContainer>
      <DanceScore
        score={props.score}
        setChallengeTitle={setChallengeTitle}
        challengeTitle={challengeTitle}
      />
      <DanceChart
        scoreList={props.scoreList}
        danceVideoRef={props.danceVideoRef}
      />
      <Btn btnText={"챌린지 다시하기"} handleClick={handleBackBtnClick} />
    </StyleContainer>
  );
}

export default DanceResult;
