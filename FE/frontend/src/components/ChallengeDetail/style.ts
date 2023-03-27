import styled from "styled-components";

const ChallengeTitleContainer = styled.div`
  padding: 1em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 480px;
  h3 {
    padding-right: 2em;
    line-height: 1.2em;
    font-size: 1.2em;
    font-weight: 600;
  }
  div {
    position: relative;
    span {
      visibility: hidden;
      position: absolute;
      width: 4.4em;
      background-color: var(--lightgray-color);
      color: var(--darkgray-color);
      text-align: center;
      padding: 5px;
      border-radius: 6px;
      bottom: 1.75em;
      margin-left: -2.5em;
    }
    :hover span {
      visibility: visible;
    }
  }
`;

const TableContainer = styled.div`
  margin: 1em 10% 0;
  background-color: var(--purple-color);
  border-radius: 25px;
  text-align: center;

  div {
    display: flex;
    margin: 0 auto;
    padding: 1em 0;
    strong {
      width: 50%;
      font-weight: 600;
    }
    p {
      width: 50%;
    }
  }
`;

export { ChallengeTitleContainer, TableContainer };
