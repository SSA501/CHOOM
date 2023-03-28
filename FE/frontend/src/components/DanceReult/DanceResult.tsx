import React from "react";
import DanceChart from "../../components/DanceChart/DanceChart";
import Btn from "../Btn/Btn";
import DanceScore from "../DanceScore/DanceScore";
import { StyleContainer } from "./style";
interface Score {
  score: number;
  time: number;
}

function DanceResult(props: {
  scoreList: Score[];
  score: number;
  danceVideoRef: React.MutableRefObject<any>;
  setMyUrl: (myUrl: string) => void;
  title: string;
}) {
  const handleBackBtnClick = () => {
    props.setMyUrl("");
  };

  return (
    <StyleContainer>
      <DanceScore score={props.score} title={props.title} />
      <DanceChart
        scoreList={props.scoreList}
        danceVideoRef={props.danceVideoRef}
      />
      <Btn btnText={"챌린지 시작하기"} handleClick={handleBackBtnClick} />
    </StyleContainer>
  );
}

export default DanceResult;
