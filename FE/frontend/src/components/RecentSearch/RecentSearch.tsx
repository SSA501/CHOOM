import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  RecentSearchContainer,
  SearchItemContainer,
  SearchItem,
  RemoveBtn,
} from "./style";
import { CgClose } from "react-icons/cg";
import SideTitle from "../SideTitle/SideTitle";
import { SideContainer } from "../../pages/SearchPage/style";
import {
  addSearchKeyword,
  getSearchKeywordList,
  removeSearchKeyword,
} from "../../apis/challenge";

function RecentSearch() {
  const [searchList, setSearchList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSearchKeywordList()
      .then((res) => {
        setSearchList(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (searchId: number, searchKeyword: string) => {
    // TODO: 검색 기능 구현하기 -> 기존 키워드로 검색하면 기존 키워드 삭제, 신규로 키워드 추가. 최신으로 갱신
    removeSearchKeyword(searchId);
    addSearchKeyword(searchKeyword);
    navigate({
      pathname: "",
      search: createSearchParams({
        query: searchKeyword,
      }).toString(),
    });
  };

  const handleRemove = (searchId: number) => {
    // TODO: 삭제 기능 구현하기
    removeSearchKeyword(searchId)
      .then((res) => {
        if (res?.statusCode === 200) {
          const newSearchList = searchList;
          setSearchList(
            newSearchList.filter((item) => item.searchId !== searchId)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const searchItemList = searchList.map((item: any) => (
    <SearchItem key={item.searchId}>
      <p onClick={() => handleClick(item.searchId, item.keyword)}>
        {item.keyword}
      </p>
      <RemoveBtn onClick={() => handleRemove(item.searchId)}>
        <CgClose />
      </RemoveBtn>
    </SearchItem>
  ));

  return (
    <RecentSearchContainer>
      <SideContainer>
        <SideTitle title={["최근 검색어", ""]} />
      </SideContainer>
      <SearchItemContainer>{searchItemList}</SearchItemContainer>
    </RecentSearchContainer>
  );
}

export default RecentSearch;
