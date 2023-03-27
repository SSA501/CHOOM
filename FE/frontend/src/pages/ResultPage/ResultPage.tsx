import DanceChart from "../../components/DanceChart/DanceChart";

interface Score {
  score: number;
  time: number;
}

function ResultPage(props: { scoreList: Score[]; videoUrl: string }) {
  return (
    <div>
      <p>ResultPage</p>
      <video src={props.videoUrl} controls></video>
      <DanceChart scoreList={props.scoreList} />
    </div>
  );
}

export default ResultPage;
