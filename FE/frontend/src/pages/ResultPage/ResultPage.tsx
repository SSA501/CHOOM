import React from "react";
import DanceChart from "../../components/DanceChart/DanceChart";

function ResultPage(props: { scoreList: number[]; videoUrl: string }) {
  return (
    <div>
      <p>ResultPage</p>
      <video src={props.videoUrl} controls></video>
      <DanceChart />
    </div>
  );
}

export default ResultPage;
