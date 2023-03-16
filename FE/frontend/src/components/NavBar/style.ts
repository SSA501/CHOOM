import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  width: 100vw;
  min-height: 80px;
  padding: 1em 2em 0.5em;
  border-top: 0.8em solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLi = styled.li`
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
  position: relative;
  margin-right: 2em;
`;

const NavBtnLink = styled(NavLink)`
  & div {
    display: none;
  }
  &.active div {
    display: block;
  }
`;

const ActiveBar = styled.div<{ challenge?: boolean }>`
  position: absolute;
  width: 120%;
  height: 0.3em;
  background-color: ${(props) =>
    props.challenge ? "var(--blue-color)" : "var(--orange-color)"};
  bottom: -100%;
  right: calc(50% - 1.6em);
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  overflow: hidden;
`;

export { NavContainer, NavLi, NavBtnLink, ActiveBar, Background };
