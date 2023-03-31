import React, { useState, useRef, useEffect } from "react";
import SmallMenu from "../../components/SmallMenu/SmallMenu";
import { ListContainer, ListHeader, ListHeaderBtn, DropBtn } from "./style";
import { MdOutlineVideocam } from "react-icons/md";
import { CgHeart, CgZeit } from "react-icons/cg";
import VideoList from "../../components/VideoList/VideoList";
import { getMyDanceList } from "../../apis/dance";
import { getBookmarkList } from "../../apis/challenge";

function ProfilePage() {
  const [videoList, setVideoList] = useState<"History" | "Likes">("History");
  const [videoItemList, setVideoItemList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
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
    console.log(page + "번 페이지 호출 -> 정렬: " + sort);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let res;
        if (selectHistory) {
          res = await getMyDanceList(page, 5, sort.sort);
        } else {
          res = await getBookmarkList(page, 5, sort.sort);
        }

        if (res.statusCode === 200) {
          let newData: any[];
          if (selectHistory) {
            newData = res.data.content;
          } else {
            newData = res.data.content.map((item: any) => {
              let newItem = {
                id: item.id,
                danceId: item.danceId,
                title: item.title,
                url: item.url,
                thumbnailPath: item.thumbnailPath,
                userCount: item.userCount,
                status: item.status,
                createdAt: item.createdAt,
                isLike: !selectHistory,
              };
              return newItem;
            });
          }

          setVideoItemList((prevList) => [...prevList, ...newData]);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page, sort, selectHistory]);

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
    setPage(0);
    setVideoItemList([]);
    if (mode === "History") {
      setSelectHistory(true);
      dropMenuItemList[0].handleClick();
    } else {
      setSelectHistory(false);
      dropMenuItemList[2].handleClick();
    }
  };

  useEffect(() => {
    setPage(0);
    setVideoItemList([]);
    setDropMenuOpen(false);
  }, [sort]);

  const dropMenuItemList: {
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
                ? dropMenuItemList
                : dropMenuItemList.slice(2, 4)
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
