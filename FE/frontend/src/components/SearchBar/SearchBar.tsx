import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { SearchBarContainer, SearchIcon, SearchInput } from "./style";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.length < 1) {
        alert("검색어를 입력하세요");
        return;
      }

      // search 실행
      navigate(`/challenge/${inputValue}`);
    }
  };

  return (
    <SearchBarContainer>
      <SearchIcon>
        <CgSearch size={"24px"} />
      </SearchIcon>
      <SearchInput
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setInputValue(e.target.value.trim())
        }
        onKeyDown={handleKeyDown}
        placeholder="곡명 혹은 영상 링크를 검색하세요"
      />
    </SearchBarContainer>
  );
}

export default SearchBar;
