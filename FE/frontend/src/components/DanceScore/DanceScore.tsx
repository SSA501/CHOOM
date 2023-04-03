import React, { useEffect, useState, ChangeEvent } from "react";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import { MdOutlineMode } from "react-icons/md";
import { Pie, PieChart, Cell } from "recharts";

import {
  Header,
  EditIcon,
  ChallengeTitleContainer,
  ShareContainer,
} from "./style";
import { updateChallengeTitle } from "../../apis/challenge";

function DanceScore(props: { score: number; danceId: string; title: string }) {
  const [challengeTitle, setChallengeTitle] = useState(props.title);
  const [currentScore, setCurrentScore] = React.useState(0); // 현재 점수를 상태로 관리
  const data = [
    { name: "Group A", value: currentScore },
    { name: "Group B", value: 100 - currentScore },
  ];
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(challengeTitle);

  const cancelUpdateChallengeTitle = () => {
    setIsEditing(false);
  };
  const updateChallengeTitleClick = () => {
    setIsEditing(false);
    setChallengeTitle(inputValue);
    updateChallengeTitle(props.danceId, inputValue);
  };

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
      <ShareContainer>
        <ChallengeTitleContainer>
          {isEditing ? (
            <textarea
              rows={3}
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setInputValue(e.target.value);
              }}
            />
          ) : (
            <h3>{challengeTitle}</h3>
          )}

          <EditIcon isEditing={isEditing}>
            {isEditing ? (
              <>
                <CgCloseO
                  onClick={cancelUpdateChallengeTitle}
                  style={{ marginRight: ".3em" }}
                />
                <CgCheckO
                  onClick={updateChallengeTitleClick}
                  style={{ color: "var(--green-color)" }}
                />
              </>
            ) : (
              <MdOutlineMode
                onClick={() => setIsEditing((prev: any) => !prev)}
              />
            )}
            <span>{!isEditing && "제목 편집"}</span>
          </EditIcon>
        </ChallengeTitleContainer>
      </ShareContainer>
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
          {currentScore}점
        </text>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={65}
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
