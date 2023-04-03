import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

import { Dance, Score } from "../../constants/types";
import DanceShare from "../DanceShare/DanceShare";

function DanceChart(props: {
  score: number;
  scoreList: Score[];
  danceVideoRef: React.MutableRefObject<any>;
  myUrl: string;
  isGuide?: boolean;
  setIsGuide?: (isGuide: boolean) => void;
  dance: Dance;
}) {
  const data = props.scoreList;

  const handelChartClick = (e: any) => {
    console.log(e.activeLabel);
    props.danceVideoRef.current.changeVideoTime(e.activeLabel);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "450px", width: "45vw" }}>
        <div style={{ marginLeft: "50px", textAlign: "center" }}>
          클릭을 하면 해당 시간으로 재생됩니다
        </div>
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
            <XAxis dataKey="time">
              <Label value="초" offset={10} position="right" />
            </XAxis>
            <YAxis type="number" domain={[0, 100]} />

            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke={
                props.score >= 80
                  ? "var(--green-color)"
                  : props.score >= 60
                  ? "var(--purple-color)"
                  : props.score >= 40
                  ? "var(--blue-color)"
                  : "var(--skyblue-color)"
              }
              fill={
                props.score >= 80
                  ? "var(--green-color)"
                  : props.score >= 60
                  ? "var(--purple-color)"
                  : props.score >= 40
                  ? "var(--blue-color)"
                  : "var(--skyblue-color)"
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <DanceShare
        dance={props.dance}
        myUrl={props.myUrl}
        score={props.score}
        setIsGuide={props.setIsGuide}
        isGuide={props.isGuide}
      />
    </div>
  );
}

export default DanceChart;
