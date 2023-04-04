import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { ShadowContainer } from "../ShadowContainer/style";
import { SearchCircle, SearchContainer } from "./style";

function SearchArea() {
  return (
    <SearchContainer>
      <SearchCircle>
        <ShadowContainer
          padding="1em 2em"
          boxShadow="6px 6px black"
          margin="0 auto 1em"
        >
          SEARCH
        </ShadowContainer>
      </SearchCircle>
      <SearchBar />
    </SearchContainer>
  );
}

export default SearchArea;
