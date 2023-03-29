import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Score {
  score: number;
  time: number;
}

function DanceChart(props: {
  scoreList: Score[];
  danceVideoRef: React.MutableRefObject<any>;
}) {
  const data = props.scoreList;

  const handelChartClick = (e: any) => {
    console.log(e.activeLabel);
    props.danceVideoRef.current.changeVideoTime(e.activeLabel);
  };
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          onClick={(e) => handelChartClick(e)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="score"
            stroke="var(--purple-color)"
            fill="var(--purple-color)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DanceChart;
