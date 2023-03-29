import React from "react";
import CircleBtn from "../CircleBtn/CircleBtn";
import {
  TitleContainer,
  TitleBar,
  TitleText,
  ContentsContainer,
} from "./style";

function SideSubTitle(props: {
  title: string;
  contents?: string[];
  score?: number;
  videoTitle?: string;
  myUrl?: string;
}) {
  const handleKakaoClick = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: props.videoTitle,
        description:
          "주대선님이 " +
          props.videoTitle +
          " 챌린지에서 " +
          props.score +
          "점을 기록했습니다.",
        imageUrl: props.myUrl,
        link: {
          mobileWebUrl: "https://j8a501.p.ssafy.io/",
          webUrl: "https://j8a501.p.ssafy.io/",
        },
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: "나도 도전하기",
          link: {
            mobileWebUrl: "https://j8a501.p.ssafy.io/dance",
            webUrl: "https://j8a501.p.ssafy.io/dance",
          },
        },
      ],
    });
  };

  const handleClickDownload = () => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.href = props.myUrl!;
    a.download = props.videoTitle + "_" + props.score + "점.webm";
    a.click();
    window.URL.revokeObjectURL(props.myUrl!);
  };
  return (
    <TitleContainer>
      <TitleText>{props.title}</TitleText>
      <TitleBar />
      {props.contents ? (
        props.contents?.map((content, i) => {
          return <TitleText key={i}>{content}</TitleText>;
        })
      ) : (
        <ContentsContainer>
          <CircleBtn
            icon="kakao"
            label="공유하기"
            onClick={handleKakaoClick}
            size="big"
          />
          <CircleBtn icon="tiktok" label="다운로드" size="big" />
          <CircleBtn icon="youtube_shorts" label="다운로드" size="big" />
          <CircleBtn
            icon="download"
            label="다운로드"
            onClick={handleClickDownload}
            size="big"
          />
        </ContentsContainer>
      )}
    </TitleContainer>
  );
}

export default SideSubTitle;
