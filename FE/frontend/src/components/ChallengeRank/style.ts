import styled from "styled-components";

const RankOuterContainer = styled.div`
  padding: 1em 0;
  border-bottom: 0.5px solid var(--green-color);
`;

const RankContainer = styled.div`
  background-color: var(--green-color);
  border-radius: 25px;
  padding: 1em 1.2em;
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const RankInnerDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    flex: 1;
    text-align: center;
  }
`;

export { RankOuterContainer, RankContainer, RankInnerDiv };
