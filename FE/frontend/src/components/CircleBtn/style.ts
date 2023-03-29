import styled from "styled-components";
import { IconType } from "react-icons/lib";

const BtnContainer = styled.div<{ size?: string }>`
  width: ${(props) => (props.size === "big" ? "100px" : "60px")};
`;

const Btn = styled.button<{ icon?: IconType | string }>`
  position: relative;
  border: none;
  border-radius: ${(props) =>
    typeof props.icon === "string" ? "4rem" : "2rem"};
  width: ${(props) => (typeof props.icon === "string" ? "100px" : "60px")};
  height: ${(props) => (typeof props.icon === "string" ? "100px" : "60px")};
  border: 2px solid
    ${(props) =>
      typeof props.icon === "string" ? "white" : "var(--purple-color)"};
  background-color: var(--white-color);
  color: var(--purple-color);
  font-size: ${(props) => (typeof props.icon === "string" ? "50px" : "20px")};
  margin-top: 20px;
  line-height: 10px;

  & > svg {
    font-size: ${(props) =>
      typeof props.icon === "string" ? "44px" : "28px"} !important;
  }
  &:hover {
    ${(props) =>
      props.icon === "kakao"
        ? "border: 2px solid #FFE550"
        : props.icon === "tiktok"
        ? "border: 2px solid black"
        : props.icon === "youtube_shorts"
        ? "border: 2px solid red"
        : props.icon === "download"
        ? "border: 2px solid var(--purple-color)"
        : "background-color: var(--purple-color)"};
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

const BtnLabel = styled.div<{ disabled?: string; icon?: IconType | string }>`
  text-align: center;
  color: ${(props) =>
    props.disabled === "disabled" ? "#666666" : "var(--darkgray-color)"};
  font-size: 16px;
  margin-top: 12px;
  width: ${(props) => (typeof props.icon === "string" ? "100px" : "60px")};
`;

export { Btn, BtnLabel, BtnContainer };
