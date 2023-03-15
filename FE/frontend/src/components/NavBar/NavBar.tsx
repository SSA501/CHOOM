import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from '../Modal/LoginModal';
import NormalModal from '../Modal/NormalModal';
import { ActiveBar, NavBtnLink, NavContainer, NavLi, Background } from "./style";

function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [normalModalOpen, setNormalModalOpen] = useState(false);

  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

  const showNormalModal = () => {
    setNormalModalOpen(true);
  };

  const navigate = useNavigate();
  return (
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
        <NavLi>
          <NavBtnLink to="" onClick={showNormalModal}>
            탈퇴하기
          </NavBtnLink>
        </NavLi>
      </ul>
      {(loginModalOpen||normalModalOpen) && <Background />}
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
      {normalModalOpen && <NormalModal setNormalModalOpen={setNormalModalOpen} acceptModal={() => alert("탈퇴하기!!")} />}
    </NavContainer>
  );
}

export default NavBar;
