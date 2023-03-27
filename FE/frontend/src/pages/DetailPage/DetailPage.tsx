import React from "react";
import Btn from "../../components/Btn/Btn";
import ChallengeDetail from "../../components/ChallengeDetail/ChallengeDetail";
import ChallengeRank from "../../components/ChallengeRank/ChallengeRank";
import {
  ChallengeDetailContainer,
  ChallengeDetailTitle,
  DetailContainer,
  DetailPageContainer,
  VideoContainer,
} from "./style";

function DetailPage() {
  const videoData = {
    dance: {
      videoId: "khcSrutAcTo",
      url: "https://www.youtube.com/embed/fYQxthUKung?autoplay=1&mute=1&controls=1&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=53",
      thumbnailPath:
        "https://i.ytimg.com/vi/fYQxthUKung/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLCWglyEsDggRm3EeUuUFrcT5b7iBA",
      title:
        "#뉴진스 #하입보이 #hypeboy #newjeans #지금무슨노래 #하입보이챌린지 #쇼츠 #shorts",
      userCount: 2,
      likeCount: 3669,
      status: 0,
      sec: 56,
      viewCount: 1426395,
      publishedAt: "2023.03.10",
    },
    myDance: [
      {
        userId: 1,
        nickname: "sdfsdf",
        score: 99,
        videoLength: 0,
        title: "내가",
        youtubeUrl: "",
        tiktokUrl:
          "https://www.tiktok.com/@n1mbostratus/video/7208437948126153985?q=%EC%B1%8C%EB%A6%B0%EC%A7%80",
      },
      {
        userId: 1,
        nickname: "sdfsdf",
        score: 70,
        videoLength: 0,
        title: "내가만든쇼츠~",
        youtubeUrl:
          "https://www.youtube.com/watch?v=eATSXqJ6htE&list=RDeATSXqJ6htE&start_radio=1",
        tiktokUrl: "",
      },
      {
        userId: 2,
        nickname: "sdfsdf",
        score: 70,
        videoLength: 0,
        title: "내가만든쇼츠~",
        youtubeUrl:
          "https://www.youtube.com/watch?v=eATSXqJ6htE&list=RDeATSXqJ6htE&start_radio=1",
        tiktokUrl: "",
      },
    ],
  };

  return (
    <DetailPageContainer>
      <VideoContainer>
        <iframe
          src={videoData?.dance.url}
          title={videoData?.dance.title}
          width="360px"
          height="640px"
        />
      </VideoContainer>
      {/* TODO : DB 비디오 주소로 변경 */}
      {/* <video
            src={url}
            autoPlay
            controls
            width="360px"
            height="640px"
          /> */}
      <DetailContainer>
        <div>
          <ChallengeDetailContainer>
            <ChallengeDetailTitle>DETAIL</ChallengeDetailTitle>
            <ChallengeDetail
              title={videoData?.dance.title}
              userCount={videoData?.dance.userCount}
              sec={videoData?.dance.sec}
              viewCount={videoData?.dance.viewCount}
              publishedAt={videoData?.dance.publishedAt}
            />
          </ChallengeDetailContainer>
          <ChallengeDetailContainer>
            <ChallengeDetailTitle>RANK</ChallengeDetailTitle>
            {videoData?.myDance.length > 0 ? (
              videoData?.myDance.map(
                ({ userId, nickname, score, youtubeUrl, tiktokUrl }) => (
                  <ChallengeRank
                    userId={userId}
                    nickname={nickname}
                    score={score}
                    youtubeUrl={youtubeUrl}
                    tiktokUrl={tiktokUrl}
                  />
                )
              )
            ) : (
              <div>아직 이 챌린지를 연습한 사람이 없어요! 연습해볼까요?</div>
            )}
          </ChallengeDetailContainer>
        </div>
        <div>
          <Btn btnText={"챌린지 시작하기"} handleClick={() => {}} />
        </div>
      </DetailContainer>
    </DetailPageContainer>
  );
}

export default DetailPage;
