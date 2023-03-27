import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallMenu from "../../components/SmallMenu/SmallMenu";
import NormalModal from "../../components/Modal/NormalModal";
import {
  ProfileContainer,
  ListContainer,
  ListHeader,
  ListHeaderBtn,
  DropBtn,
  VideoList,
  VideoItem,
} from "./style";
import { MdOutlineVideocam } from "react-icons/md";
import { CgHeart, CgZeit } from "react-icons/cg";
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
    if (mode === "History") {
      setSelectHistory(true);
      setSelectedDropMenu(historyDropMenuItemList[0].name);
    } else {
      setSelectHistory(false);
      setSelectedDropMenu(likesDropMenuItemList[0].name);
    }
  };

  const historyDropMenuItemList = [
    {
      name: "높은 등급순",
      handleClick: () => {
        // TODO: 정렬 기능 추가
        setSelectedDropMenu("높은 등급순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "낮은 등급순",
      handleClick: () => {
        // TODO: 정렬 기능 추가
        setSelectedDropMenu("낮은 등급순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "최신순",
      handleClick: () => {
        // TODO: 정렬 기능 추가
        setSelectedDropMenu("최신순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "오래된순",
      handleClick: () => {
        // TODO: 정렬 기능 추가
        setSelectedDropMenu("오래된순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
  ];

  const likesDropMenuItemList = [
    {
      name: "최신순",
      handleClick: () => {
        // TODO: 정렬 기능 추가
        setSelectedDropMenu("최신순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "오래된순",
      handleClick: () => {
        // TODO: 정렬 기능 추가
        setSelectedDropMenu("오래된순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
  ];

  const itemList = [
    {
      id: 1,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 2,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 3,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 4,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 5,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 6,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 7,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 8,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 9,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
    {
      id: 10,
      videoName: "Zior Park - CHRISTIAN",
      videoPath: "https://youtube.com/shorts/TIA-NZsr0Hg",
      thumbnailSrc:
        "https://i.ytimg.com/vi/TIA-NZsr0Hg/hq720.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAhEwsDnxjP2irgSYefdVYaXTXrEA",
    },
  ];

  const videoItemList = itemList.map((item: any) => (
    <VideoItem>
      <Video
        id={item.id}
        title={item.title}
        videoPath={item.videoPath}
        thumbnailSrc={item.thumbnailSrc}
        handleClickVideo={() => {}}
      />
      <p>{item.videoName}</p>
    </VideoItem>
  ));

  return (
    <ProfileContainer>
      <ProfileCard showNormalModal={showNormalModal} />
      <ListContainer>
        <ListHeader>
          <ListHeaderBtn
            selected={selectHistory}
            onClick={() => changVideoList("History")}
          >
            <MdOutlineVideocam />
            기록
          </ListHeaderBtn>
          <ListHeaderBtn
            selected={!selectHistory}
            onClick={() => changVideoList("Likes")}
          >
            <CgHeart />
            즐겨찾기
          </ListHeaderBtn>
          <DropBtn onClick={showDropMenu}>
            {dropMenuOpen && <CgZeit />}
            {!dropMenuOpen && <CgZeit style={{ transform: "scaleY(-1)" }} />}
            {selectedDropMenu}
          </DropBtn>
          {dropMenuOpen && (
            <SmallMenu
              itemList={
                videoList === "History"
                  ? historyDropMenuItemList
                  : likesDropMenuItemList
              }
              top="60px"
              right="60px"
              dropMenu={true}
            ></SmallMenu>
          )}
        </ListHeader>
        {videoList === "History" && (
          <VideoList>비디오 목록 비디오 목록 비디오 목록</VideoList>
        )}
        {videoList === "Likes" && <VideoList>{videoItemList}</VideoList>}
      </ListContainer>

      {normalModalOpen && (
        <NormalModal
          setNormalModalOpen={setNormalModalOpen}
          acceptModal={() => withdrawMember()}
        />
      )}
    </ProfileContainer>
  );
}

export default ProfilePage;
