import styled from "styled-components";

const RankOuterContainer = styled.div`
  padding: 1em 0;
  border-bottom: 0.5px solid var(--green-color);
`;

const RankContainer = styled.div`
  background-color: var(--green-color);
  border-radius: 25px;
  padding: 1em 1.2em;
  display: flex;
  align-items: center;
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const ProfilePicContainer = styled.div`
  max-width: 60px;
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

const ProfileDetailContainer = styled.div`
  flex: 1;
  padding: 0 1em;
`;

const RankInnerDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    flex: 1;
    text-align: center;
    font-size: 1.1rem;
  }
`;

export {
  RankOuterContainer,
  ProfilePicContainer,
  ProfileDetailContainer,
  RankContainer,
  RankInnerDiv,
};
