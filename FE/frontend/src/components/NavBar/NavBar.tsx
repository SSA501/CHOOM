import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../constants/types";
import LoginModal from "../Modal/LoginModal";
import { NavBtnLink, NavContainer, NavLi, NavUl, LoginBtn } from "./style";

function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const isLogin = useAppSelector((state) => state.main.isLogin);
  const navigate = useNavigate();

  const showLoginModal = () => {
    setLoginModalOpen(true);
    document.body.style.overflow = "hidden";
  };

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
            <NavBtnLink
              challenge={true}
              onClick={() => {
                if (isLogin) {
                  navigate("/challenge");
                } else {
                  showLoginModal();
                }
              }}
            >
              챌린지
            </NavBtnLink>
          </NavLi>
          {isLogin ? (
            <NavLi>
              <NavBtnLink
                onClick={() => {
                  if (isLogin) navigate("/profile");
                }}
              >
                프로필
              </NavBtnLink>
            </NavLi>
          ) : (
            <NavLi>
              <LoginBtn onClick={showLoginModal}>로그인</LoginBtn>
            </NavLi>
          )}
        </NavUl>
      </NavContainer>
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
    </header>
  );
}

export default NavBar;
