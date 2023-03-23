import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallMenu from "../../components/SmallMenu/SmallMenu";
import NormalModal from "../../components/Modal/NormalModal";
import {
  ProfileDiv,
  RightDiv,
  ListHeader,
  ListHeaderBtn,
  DropBtn,
  VideoList,
  VideoItem,
} from "./style";
import { CgShapeTriangle } from "react-icons/cg";
import Video from "../../components/Video/Video";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

function ProfilePage() {
  const [videoList, setVideoList] = useState<string>("History");
  const [selectHistory, setSelectHistory] = useState<boolean>(true);
  const [selectedDropMenu, setSelectedDropMenu] =
    useState<string>("높은 등급순");
  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [normalModalOpen, setNormalModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const showDropMenu = () => {
    setDropMenuOpen(!dropMenuOpen);
  };

  const showNormalModal = () => {
    setNormalModalOpen(true);
  };

  const withdrawMember = () => {
    // TODO: 탈퇴하기 기능 구현
    alert("탈퇴 완료!");
    navigate("/");
  };

  const changVideoList = (mode: string) => {
    setVideoList(mode);
    if (mode === "History") setSelectHistory(true);
    else setSelectHistory(false);
  };

  const dropMenuItemList = [
    {
      name: "높은 등급순",
      handleClick: () => {
        setSelectedDropMenu("높은 등급순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "낮은 등급순",
      handleClick: () => {
        setSelectedDropMenu("낮은 등급순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "최신순",
      handleClick: () => {
        setSelectedDropMenu("최신순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "오래된순",
      handleClick: () => {
        setSelectedDropMenu("오래된순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
  ];

  const itemList = [
    {
      id: 1,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 2,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 3,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 4,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 5,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 6,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 7,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 8,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 9,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 10,
      videoName: "Zior Park - CHRISTIAN",
      videoSrc: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
  ];

  const videoItemList = itemList.map((item: any) => (
    <VideoItem>
      <Video
        id={item.id}
        videoSrc={item.videoSrc}
        thumbnailSrc={item.thumbnailSrc}
      />
      <p>{item.videoName}</p>
    </VideoItem>
  ));

  return (
    <ProfileDiv>
      <ProfileCard showNormalModal={showNormalModal} />

      <RightDiv>
        <ListHeader>
          <ListHeaderBtn
            selected={selectHistory}
            onClick={() => changVideoList("History")}
          >
            History
          </ListHeaderBtn>
          <span>|</span>
          <ListHeaderBtn
            selected={!selectHistory}
            onClick={() => changVideoList("Likes")}
          >
            Likes
          </ListHeaderBtn>
          <DropBtn onClick={showDropMenu}>
            {dropMenuOpen && <CgShapeTriangle fontSize={"18px"} />}
            {!dropMenuOpen && (
              <CgShapeTriangle
                style={{ transform: "scaleY(-1)" }}
                fontSize={"18px"}
              />
            )}
            {" " + selectedDropMenu}
          </DropBtn>
          {dropMenuOpen && (
            <SmallMenu
              itemList={dropMenuItemList}
              top="75px"
              right="18px"
            ></SmallMenu>
          )}
        </ListHeader>
        {videoList === "History" && (
          <VideoList>비디오 목록 비디오 목록 비디오 목록</VideoList>
        )}
        {videoList === "Likes" && <VideoList>{videoItemList}</VideoList>}
      </RightDiv>

      {normalModalOpen && (
        <NormalModal
          setNormalModalOpen={setNormalModalOpen}
          acceptModal={() => withdrawMember()}
        />
      )}
    </ProfileDiv>
  );
}

export default ProfilePage;
