import styled from "styled-components";

const ProfileDiv = styled.div`
  position: relative;
  width: 360px;
  height: 500px;
  margin-top: 30px;
  margin-inline: auto;
  border: 1px solid var(--blue-color);

  & > svg {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
`;

const SettingBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 14px;
  width: 40px;
  height: 40px;
`;

const EditProfileBtn = styled.button<{ editAccept?: boolean }>`
  position: absolute;
  top: 18px;
  right: ${(props) => (props.editAccept ? "10px" : "50px")};
  width: 40px;
  height: 40px;
  color: ${(props) =>
    props.editAccept ? "var(--green-color)" : "var(--red-color)"};
`;

const ProfileImg = styled.div<{ BgImg: string }>`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-top: 44px;
  margin-inline: auto;
  background-image: url(${(props) => props.BgImg});
  background-size: cover;
`;

const Nickname = styled.input.attrs((props) => ({
  disabled: props.disabled,
}))`
  width: -webkit-calc(100% - 60px);
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
  margin: 15px auto 0px;
  color: black;
  border-bottom: ${(props) => (props.disabled ? "none" : "3px solid #3A3A3A")};
`;

const InfoDetail = styled.table`
  position: absolute;
  bottom: 50px;
  left: 5%;
  width: 90%;
  font-family: "Libre Baskerville";
  font-style: normal;
  font-weight: 600;

  & td {
    width: 33%;
    vertical-align: middle;
  }

  & > tr:nth-child(2) {
    font-size: 12px;
    line-height: 28px;
  }
  & > tr:nth-child(3) {
    font-size: 32px;
    line-height: 68px;

    & > td > span {
      font-size: 16px;
      line-height: 20px;
    }
  }
`;

export {
  ProfileDiv,
  SettingBtn,
  EditProfileBtn,
  ProfileImg,
  Nickname,
  InfoDetail,
};
