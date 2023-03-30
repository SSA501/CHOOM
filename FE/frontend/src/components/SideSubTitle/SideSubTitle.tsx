import React from "react";
import {
  TitleContainer,
  TitleBar,
  TitleText,
  ContentsContainer,
} from "./style";
import { Dance } from "../../constants/types";

function SideSubTitle(props: {
  title: string;
  contents?: string[];
  score?: number;
  myUrl?: string;
  dance: Dance;
}) {
  const handleKakaoClick = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: props.dance.title,
        description:
          "주대선님이 " +
          props.dance.title +
          " 챌린지에서 " +
          props.score +
          "점을 기록했습니다.",
        imageUrl: props.dance.thumbnailPath,
        link: {
          mobileWebUrl: "https://j8a501.p.ssafy.io/dance/" + props.dance.id,
          webUrl: "https://j8a501.p.ssafy.io/dance/" + props.dance.id,
        },
      },
      social: {
        likeCount: props.dance.likeCount,
        viewCount: props.dance.viewCount,
        subscriberCount: props.dance.userCount,
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
    a.download = props.dance.title + "_" + props.score + "점.webm";
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
          <button onClick={handleKakaoClick}>카카오</button>
          <button onClick={handleClickDownload}>다운로드</button>
        </ContentsContainer>
      )}
    </TitleContainer>
  );
}

export default SideSubTitle;
