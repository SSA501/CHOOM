import styled from "styled-components";

const VideoListContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;

  @media screen and (min-width: 1850px) {
    width: 1305px;
  }
  @media screen and (max-width: 1850px) {
    width: 980px;
  }
`;

const VideoItem = styled.div<{ bgColor: string; isLike?: boolean }>`
  position: relative;
  width: 290px;
  height: 500px;
  margin: 18px;
  background-color: var(--${(props) => props.bgColor}-color);
  border-radius: 15px;

  & > div:first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & > div:last-child {
    position: absolute;
    top: 21px;
    right: 16px;
    width: 60px;
    height: 40px;
    border-radius: 10px;
    text-align: center;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 38px;
    color: var(--white-color);
    background-color: var(--${(props) => props.bgColor}-color);
  }

  & > svg {
    position: absolute;
    top: 21px;
    right: 21px;
    font-size: 32px !important;
    fill: ${(props) => (props.isLike ? "red" : "white")};

    & > path:last-child {
      stroke: ${(props) => (props.isLike ? "white" : "black")};
      stroke-width: 1;
    }
  }
`;

export { VideoListContainer, VideoItem };
