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
import { SERVER_URL } from "../../constants/url";

function MyDancePage() {
  const { myDanceId } = useParams();
  const [dance, setDance] = useState<Dance>();
  const danceVideoRef = useRef<any>();
  const [myDanceInfo, setMyDanceInfo] = useState<{
    scoreList: Score[];
    score: number;
    myUrl: string;
    title: string;
    danceId: string;
    id: string;
  }>({
    scoreList: [],
    score: 0,
    myUrl: "",
    title: "",
    danceId: "",
    id: "",
  });
  useEffect(() => {
    getMyDanceDetail(myDanceId!)
      .then((res) => {
        console.log(res);
        setMyDanceInfo({
          scoreList: JSON.parse(res?.data?.matchRate),
          score: res?.data?.score,
          myUrl: SERVER_URL + res?.data?.videoPath,
          title: res?.data?.title,
          danceId: res?.data?.danceId,
          id: res.data.id,
        });
        getChallengeDetail(res?.data?.danceId)
          .then((res) => {
            console.log(res);
            setDance(res?.data?.dance);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [myDanceId]);

  const changeVideoTime = (time: number) => {
    if (danceVideoRef.current) danceVideoRef.current.currentTime = time;
    danceVideoRef.current?.play();
  };
  return (
    <DancePageContainer>
      <ShadowContainer
        padding="8px"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        minHeight="800px"
      >
        <ResultVideo
          src={myDanceInfo?.myUrl}
          ref={danceVideoRef}
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
              myDanceId={myDanceInfo!.id}
            />
            <div style={{ display: "flex" }}>
              <DanceChart
                myDanceId={myDanceInfo!.id}
                scoreList={myDanceInfo!.scoreList}
                danceVideoRef={danceVideoRef}
                score={myDanceInfo!.score}
                myUrl={myDanceInfo!.myUrl}
                dance={dance!}
                changeVideoTime={changeVideoTime}
              />
            </div>
          </StyleContainer>
        </DanceResultContainer>
      </ShadowContainer>
    </DancePageContainer>
  );
}

export default MyDancePage;
