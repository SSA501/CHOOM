import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallMenu from "../SmallMenu/SmallMenu";
import {
  ProfileImg,
  ProfileImgBG,
  AddProfileImgBtn,
  NicknameContainer,
  Nickname,
  ErrorMsg,
  InfoDetail,
  SettingBtn,
  BtnContainer,
  EditProfileBtn,
} from "./style";
import { CgCheckO, CgCloseO, CgMathPlus } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";
import { ShadowContainer } from "../ShadowContainer/style";
import { useAppDispatch } from "../../constants/types";
import { updateAccessToken, updateLoginStatus } from "../../store/mainReducer";
import { logout } from "../../apis/user";

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
  const dispatch = useAppDispatch();

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
    { name: "로그아웃", handleClick: () => handleLogout() },
    {
      name: "탈퇴하기",
      color: "red",
      handleClick: () => props.showNormalModal(),
    },
  ];

  const handleLogout = () => {
    logout()
      .then(() => {
        dispatch(updateLoginStatus(false));
        dispatch(updateAccessToken(""));
        navigate("/");
      })
      .catch((err) => console.log(err));
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
    <ShadowContainer
      width={"100%"}
      height={"204px"}
      padding={"27px"}
      bgColor={editProfileMode ? "lightgray" : "white"}
      style={{ position: "relative", display: "flex" }}
    >
      <ProfileImg BgImg={tmpProfileImg}>
        {editProfileMode && (
          <>
            <ProfileImgBG />
            <AddProfileImgBtn htmlFor="profile-img">
              <CgMathPlus />
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
      <NicknameContainer>
        <Nickname
          type="text"
          onChange={handleChange}
          value={tmpNickname}
          disabled={!editProfileMode}
        />
        {editProfileMode && nicknameOverlap && (
          <ErrorMsg>해당 닉네임은 이미 존재합니다.</ErrorMsg>
        )}
      </NicknameContainer>

      <InfoDetail>
        <tbody>
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

      <BtnContainer>
        {!editProfileMode && (
          <SettingBtn onClick={showSmallMenu}>
            <TbSettings />
          </SettingBtn>
        )}
        {editProfileMode && (
          <>
            <EditProfileBtn onClick={cancelEditProfile}>
              <CgCloseO />
            </EditProfileBtn>
            <EditProfileBtn editAccept onClick={editProfile}>
              <CgCheckO />
            </EditProfileBtn>
          </>
        )}
      </BtnContainer>
      {smallMenuOpen && (
        <SmallMenu itemList={menuItemList} top="65px" right="14px"></SmallMenu>
      )}
    </ShadowContainer>
  );
}

export default ProfileCard;
