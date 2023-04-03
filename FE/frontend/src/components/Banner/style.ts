import styled from "styled-components";

const BannerContainer = styled.div<{ bgColor: string }>`
  position: relative;
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

const LeftImg = styled.img`
  position: absolute;
  top: 50%;
  left: 10%;
  height: 40vh;
  transform: translate(0, -50%);
`;

const RightImg = styled.img`
  position: absolute;
  top: 50%;
  right: 10%;
  height: 40vh;
  transform: translate(0, -50%);
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

export { BannerContainer, BannerTextContainer, LeftImg, RightImg };
