import styled, { css } from "styled-components";
import { IconType } from "react-icons/lib";
interface NormalBtnProps {
  width?: string;
  padding?: string;
  margin?: string;
}

const LoginBtn = styled.button<{
  loginType?: "kakao" | "google" | "tiktok" | "youtube_shorts";
  size?: string;
}>`
  position: relative;
  width: ${(props) => props.size || "115px"};
  height: ${(props) => props.size || "115px"};
  border-radius: 60px;
  margin-inline: ${(props) => props.size + "px" || "13px"};
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

const CircleBtnContainer = styled.div`
  width: "60px";
`;

const CircleIconBtn = styled.button<{ time?: number; color?: string }>`
  position: relative;
  margin-right: "10px";
  border: none;
  border-radius: 2rem;
  width: 60px;
  height: 60px;
  border: 2px solid ${(props) => props.color || "var(--purple-color)"};
  background-color: var(--white-color);
  color: ${(props) => props.color || "var(--purple-color)"};
  font-size: 20px;
  margin-top: 20px;
  line-height: 10px;
  cursor: pointer;
  & > svg {
    font-size: 28px !important;
  }
  &:hover {
    background-color: ${(props) => props.color || "var(--purple-color)"};
    color: var(--white-color);
  }
  &:disabled {
    cursor: not-allowed;
    border: 2px solid #999999;
    background-color: #cccccc;
    color: #666666;
    svg {
      cursor: not-allowed !important;
    }
  }
`;

const CircleBtnLabel = styled.div<{
  disabled?: string;
  icon?: IconType;
}>`
  text-align: center;
  color: ${(props) =>
    props.disabled === "disabled" ? "#666666" : "var(--darkgray-color)"};
  font-size: 16px;
  margin-top: 12px;
  width: 60px;
`;

export {
  LoginBtn,
  Icon,
  NomalBtn,
  CircleBtnContainer,
  CircleIconBtn,
  CircleBtnLabel,
};
