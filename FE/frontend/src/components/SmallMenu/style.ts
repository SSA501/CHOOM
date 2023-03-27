import styled, { css } from "styled-components";

const Menu = styled.div<{ dropMenu?: boolean; top: string; right: string }>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  width: 130px;
  border-radius: 15px;
  border: 1px solid black;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  z-index: 99;

  ${(props) =>
    props.dropMenu &&
    css`
      width: 160px;
      border-radius: 0px;
    `}
`;

const MenuBtn = styled.button<{ dropMenu?: boolean; color: string }>`
  width: 110px;
  height: 64px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${(props) => props.color};

  &:not(:last-child) {
    border-bottom: 1px solid #828282;
  }

  ${(props) =>
    props.dropMenu &&
    css`
      width: 160px;
      height: 50px;
    `}
`;

export { Menu, MenuBtn };
