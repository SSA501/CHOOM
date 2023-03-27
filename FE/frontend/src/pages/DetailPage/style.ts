import { ShadowContainer } from "./../../components/ShadowContainer/style";
import styled from "styled-components";

const DetailPageContainer = styled.div`
  padding: 3em 1em;
  width: 82%;
  /* max-width: 1728px; */
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

const ChallengeDetailContainer = styled(ShadowContainer)`
  width: 480px;
  height: 520px;
  display: inline-block;
`;

const ChallengeDetailTitle = styled.h2`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5em 0.3em;
  border-bottom: 2px solid black;
`;

const DetailContainer = styled.div``;

export {
  DetailPageContainer,
  VideoContainer,
  ChallengeDetailContainer,
  ChallengeDetailTitle,
  DetailContainer,
};
