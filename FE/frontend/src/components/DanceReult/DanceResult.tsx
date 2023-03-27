import React from "react";
import DanceChart from "../../components/DanceChart/DanceChart";

interface Score {
  score: number;
  time: number;
}

function DanceResult(props: {
  scoreList: Score[];
  danceVideoRef: React.MutableRefObject<any>;
  setMyUrl: (myUrl: string) => void;
}) {
  const handleBackBtnClick = () => {
    props.setMyUrl("");
  };

  return (
    <div>
      <DanceChart
        scoreList={props.scoreList}
        danceVideoRef={props.danceVideoRef}
      />
      <button onClick={handleBackBtnClick}>다시돌아가~</button>
    </div>
  );
}

export default DanceResult;
