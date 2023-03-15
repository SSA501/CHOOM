import styled from "styled-components";

const LoginBtn = styled.button<{ loginType?: "kakao" | "google" | "tiktok" }>`
    width: 115px;
    height: 108px;
    margin-inline: 13px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: ${(props) =>
    props.loginType === "kakao" ? "var(--yellow-color)"
        : (props.loginType === "google" ? "var(--blue-color)" : "black")};
`;

const Icon = styled.img`
    height: 22px;
    margin-bottom: 20px;
`;

const NomalBtn = styled.button<{ background?: "blue" | "yellow"}>`
    width: 184px;
    height: 67px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: white;
    border-radius: 25px;
    background-color: var(--${(props) => props.background}-color);
`;

export { LoginBtn, Icon, NomalBtn }