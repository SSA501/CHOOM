import React from "react";
import { useSearchParams } from "react-router-dom";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideTitle from "../../components/SideTitle/SideTitle";
import { SearchTopContainer } from "./style";

function SearchPage() {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();
  const query = searchParams?.get("query");

  return (
    <>
      <div>
        <SearchTopContainer>
          <SideTitle title={["검색", ""]} />
          <SearchBar currentQuery={query} />
        </SearchTopContainer>
        {query ? (
          <>
            <div>쇼츠</div>
            <div>틱톡</div>
          </>
        ) : (
          <RecentSearch />
        )}
      </div>
    </>
  );
}

export default SearchPage;
