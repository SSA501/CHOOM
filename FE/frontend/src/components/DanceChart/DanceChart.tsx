import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
import { Line, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Score {
  score: number;
  time: number;
}

function DanceChart(props: { scoreList: Score[] }) {
  const chartRef = useRef();

  console.log(props.scoreList);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const labels = props.scoreList.map((v) => v.time);
  const data = {
    labels,
    datasets: [
      {
        label: "일치율",
        data: props.scoreList.map((v) => v.score),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const handelClickChart = (event: any) => {
    console.log(getElementAtEvent(chartRef.current!, event));
  };

  return (
    <Line
      options={options}
      data={data}
      ref={chartRef}
      onClick={handelClickChart}
    />
  );
}

export default DanceChart;
