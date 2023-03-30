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
    const shareUrl = "https://j8a501.p.ssafy.io/dance/" + props.dance.id;
    console.log(shareUrl);
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
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
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
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
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
    const fileName = convertFileName(props.dance.title);
    a.download = fileName + "_" + props.score + "점.webm";
    a.click();
    window.URL.revokeObjectURL(props.myUrl!);
  };

  const convertFileName = (fileName: string) => {
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (special_pattern.test(fileName) == true) {
      fileName = fileName.replace(/[`~!@#$%^&*|\\\'\";:\/?]/gi, "");
    }
    return fileName;
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
