import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  SearchBarContainer,
  SearchCircle,
  SearchContainer,
  SearchIcon,
  SearchInput,
} from "./style";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmedValue = inputValue.trim();
      if (trimmedValue.length < 1) {
        alert("검색어를 입력하세요");
        return;
      }

      // search 실행
      navigate({
        pathname: "challenge",
        search: createSearchParams({
          query: trimmedValue,
        }).toString(),
      });
    }
  };

  return (
    <SearchContainer>
      <SearchCircle>SEARCH</SearchCircle>
      <SearchBarContainer>
        <SearchIcon>
          <CgSearch size={"24px"} />
        </SearchIcon>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="곡명 혹은 영상 링크를 검색하세요"
        />
      </SearchBarContainer>
    </SearchContainer>
  );
}

export default SearchBar;
