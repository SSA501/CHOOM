import React, { useEffect, useState } from "react";
import { updateMyDanceId } from "../../store/myDanceReducer";
import { useDispatch } from "react-redux";
import { BtnContainer } from "../Dance/style";
import ShareBtn from "../Btn/ShareBtn";
import CirlceBtn from "../Btn/CircleBtn";
import { MdDownload } from "react-icons/md";
import { getUserDetail, redirectYoutube } from "../../apis/user";
import { Dance } from "../../constants/types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import NormalModal from "../Modal/NormalModal";
import { removeMyDance } from "../../apis/dance";
import { useNavigate } from "react-router-dom";

function DanceShare(props: {
  score: number;
  myUrl: string;
  dance: Dance;
  isGuide?: boolean;
  setIsGuide?: (isGuide: boolean) => void;
  myDanceId: string;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleGuideClick = () => {
    props.setIsGuide && props.setIsGuide(!props.isGuide);
  };

  const handleYoutubeClick = () => {
    dispatch(updateMyDanceId(props.myDanceId));
    redirectYoutube();
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

  const handleModalOpen = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const removeDance = (danceId: string) => {
    removeMyDance(danceId)
      .then((res) => {
        if (res.statusCode === 200) {
          alert("삭제되었습니다!");
          navigate("/profile");
        } else {
          alert("삭제 중 문제가 발생하였습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <BtnContainer>
      {modalOpen && (
        <NormalModal
          modalText={"정말로 삭제하실 건가요?"}
          setNormalModalOpen={setModalOpen}
          acceptModal={() => removeDance(props.myDanceId)}
        />
      )}
      <ShareBtn label="kakao" size="60px" onClick={handleKakaoClick} />
      <ShareBtn
        label="youtube_shorts"
        size="60px"
        onClick={handleYoutubeClick}
      />
      <CirlceBtn
        icon={MdDownload}
        label="다운로드"
        color="var(--green-color)"
        onClick={handleClickDownload}
      />
      {props.isGuide !== undefined ? (
        <CirlceBtn
          icon={props.isGuide ? AiOutlineEye : AiOutlineEyeInvisible}
          color="var(--green-color)"
          onClick={handleGuideClick}
          label={"가이드"}
        />
      ) : (
        <CirlceBtn
          icon={MdDelete}
          color="var(--green-color)"
          onClick={handleModalOpen}
          label={"삭제"}
        />
      )}
    </BtnContainer>
  );
}

export default DanceShare;
