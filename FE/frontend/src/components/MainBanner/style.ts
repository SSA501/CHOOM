import styled from "styled-components";

const MainTopContainer = styled.div`
  width: 90%;
  max-width: 1728px;
  margin: 2em auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BannerIconsContainer = styled.div`
  position: absolute;
  bottom: 36%;
  left: -10px;
  z-index: 1;
  text-align: center;
`;

export { MainTopContainer, BannerIconsContainer };
