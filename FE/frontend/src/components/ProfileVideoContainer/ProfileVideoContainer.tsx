import React, { useState, useRef, useEffect } from "react";
import SmallMenu from "../../components/SmallMenu/SmallMenu";
import { ListContainer, ListHeader, ListHeaderBtn, DropBtn } from "./style";
import { MdOutlineVideocam } from "react-icons/md";
import { CgHeart, CgZeit } from "react-icons/cg";
import VideoList from "../../components/VideoList/VideoList";
import axios from "axios";

function ProfilePage() {
  const [videoList, setVideoList] = useState<"History" | "Likes">("History");
  const [videoItemList, setVideoItemList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectHistory, setSelectHistory] = useState<boolean>(true);
  const [selectedDropMenu, setSelectedDropMenu] =
    useState<string>("높은 등급순");
  const [dropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(updatePage, options);
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  useEffect(() => {
    console.log(page + "번 페이지 호출");
    setIsLoading(true);
    axios({
      method: "get",
      url: selectHistory
        ? "/assets/myChallengeList.json"
        : "/assets/myFavoriteList.json",
    }).then((response) => {
      setVideoItemList((prevList) => [
        ...prevList,
        ...response.data.data.content,
      ]);
      setIsLoading(false);
    });
  }, [page]);

  const updatePage = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (!isLoading && target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  const showDropMenu = () => {
    setDropMenuOpen(!dropMenuOpen);
  };

  const changVideoList = (mode: "History" | "Likes") => {
    setVideoList(mode);
    setPage(1);
    setVideoItemList([]);
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

  return (
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
      <VideoList
        listOption={videoList}
        videoList={videoItemList}
        setVideoItemList={setVideoItemList}
      />
      <div style={{ height: "30px" }} ref={target}></div>
    </ListContainer>
  );
}

export default ProfilePage;
