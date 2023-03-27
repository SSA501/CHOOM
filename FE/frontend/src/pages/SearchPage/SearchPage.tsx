import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();
  const query = searchParams.get("query");

  return query ? (
    <div>
      {query} <div>쇼츠</div> <div>틱톡</div>
    </div>
  ) : (
    <div>최근검색어</div>
  );
}

export default SearchPage;
