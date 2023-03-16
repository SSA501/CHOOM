import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import { ActiveBar, NavBtnLink, NavContainer, NavLi } from "./style";

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
        <ul>
          <NavLi>
            <NavBtnLink to="/challenge">
              <ActiveBar challenge />
              챌린지
            </NavBtnLink>
          </NavLi>
          <NavLi>
            <NavBtnLink to="/profile">
              <ActiveBar />
              프로필
            </NavBtnLink>
          </NavLi>
          <NavLi>
            <NavBtnLink to="" onClick={showLoginModal}>
              로그인
            </NavBtnLink>
          </NavLi>
        </ul>
      </NavContainer>
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
    </div>
  );
}

export default NavBar;
