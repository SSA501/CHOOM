import styled from "styled-components";

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

const NomalBtn = styled.button`
  height: 67px;
  padding: 14px 55px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: white;
  border-radius: 50px;
  background-color: black;

  // TODO: 버튼 hover 고려해보기
  &:hover {
    color: black;
    background-color: white;
    border: 3px solid black;
  }
`;

export { LoginBtn, Icon, NomalBtn };
