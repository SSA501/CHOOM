import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { SearchCircle, SearchContainer } from "./style";

function SearchArea() {
  return (
    <SearchContainer>
      <SearchCircle>SEARCH</SearchCircle>
      <SearchBar />
    </SearchContainer>
  );
}

export default SearchArea;
