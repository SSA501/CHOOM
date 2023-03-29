import styled from "styled-components";

const SideContainer = styled.div`
  position: relative;
  width: 230px;
  height: 100%;
  margin-right: 39px;

  button {
    position: absolute;
    bottom: 0px;
    height: 66px;
  }
`;

const ChallengeTitle = styled.h3`
  width: 100%;
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  line-height: 34px;
`;

const TableContainer = styled.div`
  position: absolute;
  bottom: 52px;
  width: 100%;
  height: 240px;
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 25px;
  margin-top: 2em;
  text-align: center;

  table {
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 27px;

    tr {
      height: 46px;

      td:first-child {
        width: 28%;
      }
    }
  }

  svg {
    cursor: default !important;
  }
`;

export { SideContainer, ChallengeTitle, TableContainer };
