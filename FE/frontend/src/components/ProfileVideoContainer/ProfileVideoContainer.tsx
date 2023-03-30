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
  const [sort, setSort] = useState<
    | { name: "높은 등급순"; sort: "score,desc" }
    | { name: "낮은 등급순"; sort: "score,asc" }
    | { name: "최신순"; sort: "createdAt,desc" }
    | { name: "오래된순"; sort: "createdAt,asc" }
  >({ name: "높은 등급순", sort: "score,desc" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectHistory, setSelectHistory] = useState<boolean>(true);
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
      historyDropMenuItemList[0].handleClick();
    } else {
      setSelectHistory(false);
      likesDropMenuItemList[0].handleClick();
    }
  };

  useEffect(() => {
    // TODO: 정렬 요청
    console.log(sort);
    setDropMenuOpen(!dropMenuOpen);
  }, [sort]);

  const historyDropMenuItemList: {
    name: "높은 등급순" | "낮은 등급순" | "최신순" | "오래된순";
    handleClick: () => void;
  }[] = [
    {
      name: "높은 등급순",
      handleClick: () =>
        setSort({
          name: "높은 등급순",
          sort: "score,desc",
        }),
    },
    {
      name: "낮은 등급순",
      handleClick: () =>
        setSort({
          name: "낮은 등급순",
          sort: "score,asc",
        }),
    },
    {
      name: "최신순",
      handleClick: () =>
        setSort({
          name: "최신순",
          sort: "createdAt,desc",
        }),
    },
    {
      name: "오래된순",
      handleClick: () =>
        setSort({
          name: "오래된순",
          sort: "createdAt,asc",
        }),
    },
  ];

  const likesDropMenuItemList: {
    name: "최신순" | "오래된순";
    handleClick: () => void;
  }[] = [
    {
      name: "최신순",
      handleClick: () =>
        setSort({
          name: "최신순",
          sort: "createdAt,desc",
        }),
    },
    {
      name: "오래된순",
      handleClick: () =>
        setSort({
          name: "오래된순",
          sort: "createdAt,asc",
        }),
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
          {sort.name}
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
