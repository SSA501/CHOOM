import styled, { css } from "styled-components";

const ListContainer = styled.div`
  width: 100%;
  height: fit-content;
`;

const ListHeader = styled.div`
  position: relative;
  width: -webkit-calc(100% + 12px);
  height: 66px;
  border-top: 2px solid #3a3a3a;
  margin-bottom: 20px;
`;

const ListHeaderBtn = styled.button<{ selected: boolean }>`
  width: 120px;
  height: 66px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  margin-right: 15px;
  color: #848484;
  transform: translate(0, -2px);
  border-radius: 0px 0px 25px 25px;

  ${(props) =>
    props.selected &&
    css`
      color: var(--black-color);
      border: 3px solid #000000;
      box-shadow: var(--green-color) 4px 4px;
    `}

  & > svg {
    font-size: 20px !important;
    margin-right: 6px;
  }
`;

const DropBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 60px;
  width: 165px;
  height: 41px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  float: right;

  & > svg {
    vertical-align: text-bottom !important;
    font-size: 24px !important;
  }
`;

export { ListContainer, ListHeader, ListHeaderBtn, DropBtn };
