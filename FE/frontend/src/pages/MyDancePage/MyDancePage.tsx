import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { DancePageContainer } from "../DancePage/style";
import { ShadowContainer } from "../../components/ShadowContainer/style";
import { ResultVideo } from "../../components/DanceVideo/style";
import { getMyDanceDetail } from "../../apis/dance";
import { Dance, Score } from "../../constants/types";
import {
  DanceResultContainer,
  StyleContainer,
} from "../../components/DanceReult/style";
import DanceScore from "../../components/DanceScore/DanceScore";
import DanceChart from "../../components/DanceChart/DanceChart";
import { getChallengeDetail } from "../../apis/challenge";

function MyDancePage() {
  const { danceId } = useParams();
  const [dance, setDance] = useState<Dance>();
  const danceVideoRef = useRef<any>();
  const [myDanceInfo, setMyDanceInfo] = useState<{
    scoreList: Score[];
    score: number;
    myUrl: string;
    title: string;
    danceId: string;
  }>();
  useEffect(() => {
    getMyDanceDetail(danceId!)
      .then((res) => {
        setMyDanceInfo({
          scoreList: JSON.parse(res.data.matchRate),
          score: res.data.score,
          myUrl: res.data.videoPath,
          title: res.data.title,
          danceId: res.data.danceId,
        });
        getChallengeDetail(danceId!)
          .then((res) => {
            console.log(res);
            setDance(res.data.dance);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <DancePageContainer>
      <ShadowContainer
        padding="8px"
        margin="8px 16px 16px 8px"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        minHeight="800px"
      >
        <ResultVideo
          src={myDanceInfo?.myUrl}
          width={450}
          height={800}
          controls
        />
        <DanceResultContainer>
          <StyleContainer>
            <DanceScore
              score={myDanceInfo!.score}
              danceId={myDanceInfo!.danceId}
              title={myDanceInfo!.title}
            />
            <div style={{ display: "flex" }}>
              <DanceChart
                scoreList={myDanceInfo!.scoreList}
                danceVideoRef={danceVideoRef}
                score={myDanceInfo!.score}
                myUrl={myDanceInfo!.myUrl}
                dance={dance!}
              />
            </div>
          </StyleContainer>
        </DanceResultContainer>
      </ShadowContainer>
    </DancePageContainer>
  );
}

export default MyDancePage;
