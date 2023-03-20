import styled from "styled-components";

const BannerContainer = styled.div`
  background-color: var(--blue-color);
  height: 450px;
  padding: 0 5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BannerTextContainer = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.2em;
  line-height: 2.3em;

  p:nth-of-type(1) {
    font-size: 1.7em;
  }
`;

const BannerIconsContainer = styled.div`
  text-align: center;
  width: 300px;
`;

export { BannerContainer, BannerTextContainer, BannerIconsContainer };
