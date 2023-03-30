import styled, { css } from "styled-components";

const ProfileImg = styled.div<{ BgImg: string }>`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  ${(props) =>
    props.BgImg &&
    css`
      background-image: url(${props.BgImg});
      background-size: cover;
    `}
  background-color: var(--lightgray-color);
`;

const AddProfileImgBtn = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: pointer;

  & > svg {
    font-weight: 900;
    font-size: 45px !important;
  }
`;

const ProfileImgBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: rgba(0, 0, 0, 0.55);
`;

const NicknameContainer = styled.div`
  position: relative;
  width: 340px;
  margin-left: 34px;
`;

const Nickname = styled.input.attrs((props) => ({
  disabled: props.disabled,
}))`
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 60px;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
  align-self: center;
  color: black;
  border-bottom: ${(props) => (props.disabled ? "none" : "3px solid #3A3A3A")};
`;

const ErrorMsg = styled.p`
  position: absolute;
  width: 100%;
  top: 73%;
  left: 50%;
  transform: translate(-50%, 0);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  color: red;
`;

const InfoDetail = styled.table`
  width: 420px;
  height: fit-content;
  font-style: normal;
  text-align: center;
  margin-inline: auto;
  align-self: center;

  & tr,
  & td {
    width: 140px;
    vertical-align: middle;
  }

  & tr:first-child {
    font-weight: 400;
    font-size: 28px;
    line-height: 52px;
  }
  & tr:last-child {
    font-weight: 500;
    font-size: 36px;
    line-height: 48px;

    & td > span {
      font-size: 16px;
      line-height: 20px;
    }
  }
`;

const BtnContainer = styled.div`
  position: relative;
  width: 100px;

  svg {
    font-size: 35px !important;
  }
`;

const SettingBtn = styled.button`
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
`;

const EditProfileBtn = styled.button<{ editAccept?: boolean }>`
  width: 40px;
  height: 40px;
  margin-inline: 5px;
  color: ${(props) => (props.editAccept ? "green" : "red")};
`;

export {
  ProfileImg,
  ProfileImgBG,
  AddProfileImgBtn,
  NicknameContainer,
  Nickname,
  ErrorMsg,
  InfoDetail,
  BtnContainer,
  SettingBtn,
  EditProfileBtn,
};
