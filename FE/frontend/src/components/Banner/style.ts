import styled from "styled-components";

const BannerContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => `var(--${props.bgColor}-color)`};
  color: ${(props) => (props.bgColor !== "darkgray" ? "black" : "white")};
  border-radius: 50px;
  height: 60vh;
  padding: 0 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const BannerTextContainer = styled.div`
  text-align: center;
  word-break: keep-all;

  p:nth-of-type(1) {
    font-size: 2em;
    font-weight: 600;
  }
  p:nth-of-type(2) {
    width: 50%;
    font-size: 1em;
    margin: 1.7em auto 0;
    line-height: 1.5rem;
  }
`;

export { BannerContainer, BannerTextContainer };
