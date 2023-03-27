import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import { NavBtnLink, NavContainer, NavLi, NavUl, LoginBtn } from "./style";

function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const showLoginModal = () => {
    setLoginModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const navigate = useNavigate();
  return (
    <header>
      <NavContainer>
        <div>
          <Link to="/">
            <img
              src="/assets/logo.png"
              alt="로고이미지"
              width="135px"
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
          {isLogin ? (
            <NavLi>
              <NavBtnLink to="/profile">프로필</NavBtnLink>
            </NavLi>
          ) : (
            <NavLi>
              <LoginBtn onClick={showLoginModal}>로그인</LoginBtn>
            </NavLi>
          )}
        </NavUl>
      </NavContainer>
      {loginModalOpen && (
        <LoginModal
          setIsLogin={setIsLogin}
          setLoginModalOpen={setLoginModalOpen}
        />
      )}
    </header>
  );
}

export default NavBar;
