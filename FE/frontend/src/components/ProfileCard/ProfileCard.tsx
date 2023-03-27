import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallMenu from "../SmallMenu/SmallMenu";
import {
  ProfileDiv,
  SettingBtn,
  EditProfileBtn,
  ProfileImg,
  ProfileImgBG,
  AddProfileImgBtn,
  Nickname,
  ErrorMsg,
  InfoDetail,
} from "./style";
import { ReactComponent as YellowBoom } from "../../assets/icon_yellow_boom.svg";
import { ReactComponent as GreenEllipse } from "../../assets/icon_green_ellipse.svg";
import { ReactComponent as OrangeFlower } from "../../assets/icon_orange_flower.svg";
import { ReactComponent as LayoutBottom } from "../../assets/layout_bottom.svg";
import { CgCheckO, CgCloseO, CgMathPlus } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";

type ProfileInfo = {
  nickname: string;
  profileImg: string;
  challenge: number;
  score: number;
  time: number;
};

type ProfileProps = {
  showNormalModal: () => void;
};

function ProfileCard(props: ProfileProps) {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    nickname: "왕십리 춤신춤킹",
    profileImg: "/assets/profile_sample.jpg",
    challenge: 27,
    score: 9,
    time: 123,
  });
  const [tmpProfileImg, setTmpProfileImg] = useState<string>(
    profileInfo.profileImg
  );
  const [tmpNickname, setTmpNickname] = useState<string>(profileInfo.nickname);
  const [nicknameOverlap, setNicknameOverlap] = useState<boolean>(false);
  const [smallMenuOpen, setSmallMenuOpen] = useState<boolean>(false);
  const [editProfileMode, setEditProfileMode] = useState<boolean>(false);

  const navigate = useNavigate();

  const showSmallMenu = () => {
    setSmallMenuOpen(!smallMenuOpen);
  };

  const menuItemList = [
    {
      name: "프로필 편집",
      handleClick: () => {
        setEditProfileMode(true);
        showSmallMenu();
      },
    },
    { name: "로그아웃", handleClick: () => logout() },
    { name: "탈퇴하기", handleClick: () => props.showNormalModal() },
  ];

  const logout = () => {
    // TODO: 로그아웃 기능 구현
    navigate("/");
  };

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setTmpProfileImg(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpNickname(e.target.value);
    if (profileInfo.nickname === e.target.value) {
      setNicknameOverlap(true);
    } else {
      setNicknameOverlap(false);
    }
  };

  const cancelEditProfile = () => {
    setTmpProfileImg(profileInfo.profileImg ?? "");
    setTmpNickname(profileInfo.nickname);
    setEditProfileMode(false);
  };

  const editProfile = () => {
    // TODO: 프로필 수정 요청 구현
    const newProfileInfo = {
      nickname: tmpNickname,
      profileImg: tmpProfileImg,
      challenge: profileInfo.challenge,
      score: profileInfo.score,
      time: profileInfo.time,
    };
    setProfileInfo(newProfileInfo);
    setEditProfileMode(false);
  };

  return (
    <ProfileDiv>
      {!editProfileMode && (
        <SettingBtn onClick={showSmallMenu}>
          <TbSettings fontSize={"29px"} />
        </SettingBtn>
      )}
      {editProfileMode && (
        <>
          <EditProfileBtn onClick={cancelEditProfile}>
            <CgCloseO fontSize={"29px"} />
          </EditProfileBtn>
          <EditProfileBtn editAccept onClick={editProfile}>
            <CgCheckO fontSize={"29px"} />
          </EditProfileBtn>
        </>
      )}
      {smallMenuOpen && (
        <SmallMenu itemList={menuItemList} top="65px" right="14px"></SmallMenu>
      )}

      <ProfileImg BgImg={tmpProfileImg}>
        {editProfileMode && (
          <>
            <ProfileImgBG />
            <AddProfileImgBtn htmlFor="profile-img">
              <CgMathPlus fontSize={"45px"} fontWeight={"900"} />
            </AddProfileImgBtn>
            <input
              id="profile-img"
              type="file"
              accept="image/*"
              onChange={handleProfileImg}
              style={{ display: "none" }}
            />
          </>
        )}
      </ProfileImg>
      <Nickname
        type="text"
        onChange={handleChange}
        value={tmpNickname}
        disabled={!editProfileMode}
      />
      {editProfileMode && nicknameOverlap && (
        <ErrorMsg>해당 닉네임은 이미 존재합니다.</ErrorMsg>
      )}

      <InfoDetail>
        <tbody>
          <tr>
            <td>
              <YellowBoom />
            </td>
            <td>
              <GreenEllipse />
            </td>
            <td>
              <OrangeFlower />
            </td>
          </tr>
          <tr>
            <td>챌린지</td>
            <td>점수</td>
            <td>시간</td>
          </tr>
          <tr>
            <td>
              {profileInfo.challenge}
              <span>곡</span>
            </td>
            <td>
              {profileInfo.score}
              <span>점</span>
            </td>
            <td>
              {profileInfo.time}
              <span>분</span>
            </td>
          </tr>
        </tbody>
      </InfoDetail>
      <LayoutBottom />
    </ProfileDiv>
  );
}

export default ProfileCard;
