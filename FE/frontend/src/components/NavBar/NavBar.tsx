import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import { NavBtnLink, NavContainer, NavLi, NavUl } from "./style";

function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

  const navigate = useNavigate();
  return (
    <div>
      <NavContainer>
        <div>
          <Link to="/">
            <img
              src="/assets/logo.png"
              alt="로고이미지"
              width="60px"
              onClick={() => navigate("/")}
            />
          </Link>
        </div>
        <NavUl>
          <NavLi>
            <NavBtnLink challenge={true} to="/challenge">
              챌린지
            </NavBtnLink>
          </NavLi>
          <NavLi>
            <NavBtnLink to="/profile">프로필</NavBtnLink>
          </NavLi>
          <NavLi>
            <NavBtnLink to="" onClick={showLoginModal}>
              로그인
            </NavBtnLink>
          </NavLi>
        </NavUl>
      </NavContainer>
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
    </div>
  );
}

export default NavBar;
