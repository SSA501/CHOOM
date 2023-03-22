import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  padding: 1.5em 2em 1em;
  border-top: 0.8em solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1.8em;
`;

const NavLi = styled.li`
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
`;

const NavBtnLink = styled(NavLink)<{ challenge?: boolean }>`
  padding: 1em 0.5em;
  /* & div {
    display: none;
  } */
  &.active {
    box-shadow: ${(props) =>
      props.challenge
        ? "inset 0 -5px 0 0 var(--purple-color)"
        : "inset 0 -5px 0 0 var(--green-color)"};
  }
  /* &.active div {
    display: block;
  } */
`;

export { NavContainer, NavUl, NavLi, NavBtnLink };
