import { ShadowContainer } from "./../../components/ShadowContainer/style";
import styled from "styled-components";

const DetailPageContainer = styled.div`
  padding: 3em 1em;
  /* width: 82%; */
  max-width: 1728px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 1500px) {
    flex-direction: column;
  }
`;

const VideoContainer = styled.div`
  width: 360px;
  height: 640px;
  max-width: 50%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerShadowContainer = styled(ShadowContainer)`
  width: 480px;
  height: 520px;
`;

const ChallengeDetailTitle = styled.h2`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5em 0.3em;
  border-bottom: 2px solid black;
`;

const DetailTopContainer = styled.div`
  margin-top: 2em;
  @media screen and (min-width: 1500px) {
    display: flex;
    column-gap: 4em;
  }
`;

const DetailBtnContainer = styled.div`
  text-align: center;
`;

export {
  DetailPageContainer,
  VideoContainer,
  DetailContainer,
  InnerShadowContainer,
  ChallengeDetailTitle,
  DetailTopContainer,
  DetailBtnContainer,
};
