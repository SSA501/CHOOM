import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addSearchKeyword } from "../../apis/challenge";
import { useAppSelector } from "../../constants/types";
import LoginModal from "../Modal/LoginModal";
import {
  SearchBarContainer,
  SearchBtn,
  SearchIcon,
  SearchInput,
} from "./style";

interface SearchBarProps {
  currentQuery?: string | null;
}

function SearchBar({ currentQuery }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useAppSelector(
    (state) => state && state.main && state.main.isLogin
  );
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const showLoginModal = () => {
    if (setLoginModalOpen) setLoginModalOpen(true); // setLoginModalOpen이 undefined 인 경우 대비
    document.body.style.overflow = "hidden";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      showLoginModal();
      // setLoginModalOpen(true);
      return;
    }

    if (!loginModalOpen) document.body.style.overflow = "auto";

    const trimmedValue = inputValue.trim();
    if (trimmedValue.length < 1) {
      alert("검색어를 입력하세요");
      return;
    }

    // search 실행
    addSearchKeyword(trimmedValue); // 검색어 추가

    if (location.pathname === "/challenge") {
      // 챌린지 검색 페이지 내에서 검색할 경우
      setSearchParams({ query: trimmedValue });
    } else {
      // 메인 페이지에서 검색할 경우
      navigate({
        pathname: "challenge",
        search: createSearchParams({
          query: trimmedValue,
        }).toString(),
      });
    }
  };

  useEffect(() => {
    if (currentQuery) setInputValue(currentQuery);
    if (!searchParams.get("query")) {
      setInputValue("");
    }
  }, [currentQuery, searchParams]);

  return (
    <>
      <SearchBarContainer>
        <form>
          <SearchIcon>
            <CgSearch size={"24px"} />
          </SearchIcon>
          <SearchInput
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setInputValue(e.target.value)
            }
            placeholder="곡명 혹은 영상 링크를 검색하세요"
          />
          <SearchBtn
            type="submit"
            onSubmit={handleSearch}
            onClick={handleSearch}
          >
            검색
          </SearchBtn>
        </form>
      </SearchBarContainer>
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
    </>
  );
}

export default SearchBar;
