import styled from "styled-components";

const ChallengeDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 1em 0 2em;
`;

const ChallengeTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 480px;
  h3 {
    line-height: 1.2em;
    font-size: 1.3em;
    font-weight: 600;
  }
  /* div {
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
    } */
`;

const TableContainer = styled.div`
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

export { ChallengeDetailContainer, ChallengeTitleContainer, TableContainer };
