import styled from "styled-components";

const SearchTopContainer = styled.div`
  margin-block: 30px 80px;
`;

const SideContainer = styled.div`
  float: left;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 400px;
`;

const SearchContainer = styled.div`
  height: 100px;
  padding: 1px 80px 1px 0px;

  & > div {
    height: 66px;
    margin: 32px;
    justify-content: start;
  }
`;

const ChallengeNumber = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 44px;
  padding-left: 48px;
`;

const PopularChallengeContainer = styled.div`
  margin-bottom: 100px;
`;

const YoutubeChallengeContainer = styled.div`
  margin-bottom: 100px;
`;

const SpinnerContainer = styled.div`
  width: 90%;
  max-width: 1728px;
  height: 340px;
  background-color: var(--lightgray-color);
  border-radius: 50px;
  border: 3px solid black;
  box-shadow: black 12px 12px;
  text-align: center;
  margin: auto;
`;

export {
  SearchTopContainer,
  SideContainer,
  SearchContainer,
  ChallengeNumber,
  PopularChallengeContainer,
  YoutubeChallengeContainer,
  SpinnerContainer,
};
