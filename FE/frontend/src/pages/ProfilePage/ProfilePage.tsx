import React, { useState } from "react";
import SmallMenu from "../../components/SmallMenu/SmallMenu";
import NormalModal from "../../components/Modal/NormalModal";
import {
  ProfileDiv,
  LeftDiv,
  RightDiv,
  Header,
  ProfileCard,
  SettingBtn,
  ListHeader,
  ListHeaderBtn,
  DropBtn,
  VideoList,
  VideoItem,
} from "./style";
import { FiSettings } from "react-icons/fi";
import { TbTriangle, TbTriangleInverted, TbLetterI } from "react-icons/tb";
import Video from "../../components/Video/Video";

function ProfilePage() {
  const [smallMenuOpen, setSmallMenuOpen] = useState(false);
  const [videoList, setVideoList] = useState("History");
  const [selectHistory, setSelectHistory] = useState(true);
  const [selectedDropMenu, setSelectedDropMenu] = useState("높은 등급순");
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const [normalModalOpen, setNormalModalOpen] = useState(false);

  const showSmallMenu = () => {
    setSmallMenuOpen(!smallMenuOpen);
  };

  const showDropMenu = () => {
    setDropMenuOpen(!dropMenuOpen);
  };

  const showNormalModal = () => {
    setNormalModalOpen(true);
  };

  const changVideoList = (mode: string) => {
    setVideoList(mode);
    if (mode === "History") setSelectHistory(true);
    else setSelectHistory(false);
  };

  const menuItemList = [
    { name: "프로필 편집", handleClick: () => alert("프로필 편집!!") },
    { name: "로그아웃", handleClick: () => alert("로그아웃!!") },
    { name: "탈퇴하기", handleClick: () => showNormalModal() },
  ];

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
      <LeftDiv>
        <Header>My Profile</Header>
        <ProfileCard>
          <SettingBtn onClick={showSmallMenu}>
            <FiSettings fontSize={"29px"} />
          </SettingBtn>
          {smallMenuOpen && (
            <SmallMenu
              itemList={menuItemList}
              top="65px"
              right="14px"
            ></SmallMenu>
          )}
        </ProfileCard>
      </LeftDiv>

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
            {dropMenuOpen && <TbTriangle fontSize={"14px"} />}
            {!dropMenuOpen && <TbTriangleInverted fontSize={"14px"} />}
            {" " + selectedDropMenu}
          </DropBtn>
          {dropMenuOpen && (
            <SmallMenu
              itemList={dropMenuItemList}
              top="72px"
              right="0px"
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
          acceptModal={() => alert("탈퇴하기!!")}
        />
      )}
    </ProfileDiv>
  );
}

export default ProfilePage;
