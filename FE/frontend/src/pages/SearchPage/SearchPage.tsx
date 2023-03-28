import React from "react";
import { useSearchParams } from "react-router-dom";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import SideTitle from "../../components/SideTitle/SideTitle";

function SearchPage() {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();
  const query = searchParams.get("query");

  return query ? (
    <div>
      <div>
        <SideTitle title={["검색", ""]} />
      </div>
      {query} <div>쇼츠</div> <div>틱톡</div>
    </div>
  ) : (
    <RecentSearch />
  );
}

export default SearchPage;
