import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BtnContainer } from "../Dance/style";
import ShareBtn from "../Btn/ShareBtn";
import CirlceBtn from "../Btn/CircleBtn";
import { MdDownload } from "react-icons/md";
import { getUserDetail } from "../../apis/user";
import { postingChallenge } from "../../apis/dance";
import { Dance } from "../../constants/types";

function DanceShare(props: {
  score: number;
  myUrl: string;
  dance: Dance;
  isGuide: boolean;
  setIsGuide: (isGuide: boolean) => void;
}) {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    getUserDetail()
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleKakaoClick = () => {
    const shareUrl = "https://j8a501.p.ssafy.io/dance/" + props.dance.id;
    const videoUrl = props.dance.url;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${props.dance.title} ${props.score}점`,
        description: `${userData?.nickname}님이 ${props.dance.title}챌린지에서 ${props.score}점을 기록했습니다.`,
        imageUrl: props.dance.thumbnailPath,
        link: {
          mobileWebUrl: videoUrl,
          webUrl: videoUrl,
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

  const handleGuideClick = () => {
    props.setIsGuide(!props.isGuide);
  };

  const handleYoutubeClick = () => {
    postingChallenge(props.dance.id)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <BtnContainer>
      <ShareBtn label="kakao" size="60px" onClick={handleKakaoClick} />
      <ShareBtn
        label="youtube_shorts"
        onClick={handleYoutubeClick}
        size="60px"
      />
      <CirlceBtn
        icon={MdDownload}
        label="다운로드"
        color="var(--green-color)"
        onClick={handleClickDownload}
      />
      <CirlceBtn
        icon={props.isGuide ? AiOutlineEye : AiOutlineEyeInvisible}
        onClick={handleGuideClick}
        color="var(--green-color)"
        label={"가이드"}
      />
    </BtnContainer>
  );
}

export default DanceShare;
