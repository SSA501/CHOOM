import { ShadowContainer } from "./../ShadowContainer/style";
import styled from "styled-components";

const ChallengeDetailContainer = styled(ShadowContainer)`
  width: 480px;
  height: 520px;
`;

const DetailTitle = styled.h2`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5em 0.3em;
  border-bottom: 2px solid black;
`;

export { ChallengeDetailContainer, DetailTitle };
