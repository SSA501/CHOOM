import React, { useEffect } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { Header, Title } from "./style";
function DanceScore(props: { score: number; title: string }) {
  const [currentScore, setCurrentScore] = React.useState(0); // 현재 점수를 상태로 관리
  const data = [
    { name: "Group A", value: currentScore },
    { name: "Group B", value: 100 - currentScore },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentScore < props.score) {
        setCurrentScore((prevScore) => prevScore + 1); // 1씩 증가
      } else {
        clearInterval(timer); // 점수가 도달하면 타이머를 중지
      }
    }, 17); // 10밀리초마다 실행
    return () => clearInterval(timer); // 언마운트될 때 타이머를 정리
  }, [currentScore, props.score]);

  return (
    <Header>
      <Title>{props.title}</Title>
      <PieChart width={200} height={200}>
        <text
          x="50%"
          y="50%"
          dy={15}
          textAnchor="middle"
          fill="var(--darkgray-color)"
          fontSize={40}
          fontWeight={900}
        >
          {currentScore}
        </text>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={70}
          outerRadius={90}
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                index === 0
                  ? props.score >= 80
                    ? "var(--green-color)"
                    : props.score >= 60
                    ? "var(--purple-color)"
                    : props.score >= 40
                    ? "var(--blue-color)"
                    : "var(--skyblue-color)"
                  : "var(--lightgray-color)"
              }
            />
          ))}
        </Pie>
      </PieChart>
    </Header>
  );
}

export default DanceScore;
