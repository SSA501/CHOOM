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
  getSearchKeywordList,
  removeSearchKeyword,
} from "../../apis/challenge";

function RecentSearch() {
  const [searchList, setSearchList] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClick = (searchId: number, searchKeyword: string) => {
    removeSearchKeyword(searchId);
    navigate({
      pathname: "",
      search: createSearchParams({
        query: searchKeyword,
      }).toString(),
    });
  };

  const handleRemove = (searchId: number) => {
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

  useEffect(() => {
    getSearchKeywordList()
      .then((res) => {
        setSearchList(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchItemList = searchList?.map((item: any) => (
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
      <SearchItemContainer>
        {searchList?.length > 0 ? (
          searchItemList
        ) : (
          <p>최근 검색어가 없습니다.</p>
        )}
      </SearchItemContainer>
    </RecentSearchContainer>
  );
}

export default RecentSearch;
