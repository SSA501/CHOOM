import styled from "styled-components";

const Menu = styled.div`
  width: 168px;
  border: 1px solid black;
`;

const MenuBtn = styled.button`
  width: 168px;
  height: 45px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

export { Menu, MenuBtn };
