import styled, { css } from "styled-components";

interface NormalBtnProps {
  width?: string;
  padding?: string;
  margin?: string;
}

const LoginBtn = styled.button<{ loginType?: "kakao" | "google" | "tiktok" }>`
  position: relative;
  width: 115px;
  height: 115px;
  border-radius: 60px;
  margin-inline: 13px;
  background-color: ${(props) =>
    props.loginType === "kakao"
      ? "#FFE550"
      : props.loginType === "google"
      ? "#08439D"
      : "black"};
`;

const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NomalBtn = styled.button<NormalBtnProps>`
  ${({ width, padding, margin }) => css`
    width: ${width || "fit-content"};
    padding: ${padding || "0.5em 2.5em"};
    margin: ${margin || "0 auto"};
    font-size: 24px;
    color: white;
    border-radius: 50px;
    background-color: black;
    border: 3px solid black;
  `}

  // TODO: 버튼 hover 고려해보기
  &:hover {
    color: black;
    background-color: white;
  }
`;

export { LoginBtn, Icon, NomalBtn };
