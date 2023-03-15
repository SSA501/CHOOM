import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActiveBar, NavBtnLink, NavContainer, NavLi } from "./style";

function NavBar() {
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
        <NavLi style={{ marginRight: "2em" }}>
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
      </ul>
    </NavContainer>
  );
}

export default NavBar;
