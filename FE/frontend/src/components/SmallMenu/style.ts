import styled from "styled-components";

const Menu = styled.div<{ top: string; right: string }>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  width: 130px;
  border: 1px solid black;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
  z-index: 99;
`;

const MenuBtn = styled.button`
  width: 110px;
  height: 64px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  &:not(:last-child) {
    border-bottom: 1px solid #828282;
  }
`;

export { Menu, MenuBtn };
