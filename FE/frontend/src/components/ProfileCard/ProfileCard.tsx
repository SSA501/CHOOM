import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/url";
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
import {
  checkNickname,
  getUserDetail,
  logout,
  updateUserDetail,
} from "../../apis/user";

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
    nickname: "닉네임",
    profileImg: "",
    challenge: 0,
    score: 0,
    time: 0,
  });
  const [profileImgFile, setProfileImgFile] = useState<File | undefined>();
  const [tmpProfileImg, setTmpProfileImg] = useState<string>(
    profileInfo.profileImg
  );
  const [tmpNickname, setTmpNickname] = useState<string>(profileInfo.nickname);
  const [nicknameOverlap, setNicknameOverlap] = useState<boolean>(false);
  const [smallMenuOpen, setSmallMenuOpen] = useState<boolean>(false);
  const [editProfileMode, setEditProfileMode] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserDetail()
      .then((res) => {
        if (res.statusCode === 200) {
          setProfileInfo({
            nickname: res.data.nickname,
            profileImg: `${SERVER_URL}${res.data.profileImage}`,
            challenge: res.data.userMyDanceDto.challengeCount ?? 0,
            score: res.data.userMyDanceDto.averageScore ?? 0,
            time: res.data.userMyDanceDto.challengeTime ?? 0,
          });
          setTmpNickname(res.data.nickname);
          setTmpProfileImg(`${SERVER_URL}${res.data.profileImage}`);
          getFileFomrUrlImage(`${SERVER_URL}${res.data.profileImage}`)
            .then((file) => setProfileImgFile(file))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  async function getFileFomrUrlImage(url: string) {
    const res = await fetch(url);
    const data = await res.blob();
    const fileName = url.split("/").pop();
    const fileExt = url.split(".").pop();
    const metaData = { type: `image/${fileExt}` };
    return new File([data], fileName ? fileName : "profile image", metaData);
  }

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

  const showSmallMenu = () => {
    setSmallMenuOpen(!smallMenuOpen);
  };

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
          setProfileImgFile(files[0]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkNicknameOverlap(e.target.value);
    setTmpNickname(e.target.value);
  };

  const checkNicknameOverlap = (nickname: string) => {
    checkNickname(nickname)
      .then((res) => {
        if (res.statusCode === 200) {
          setNicknameOverlap(false);
        } else {
          setNicknameOverlap(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelEditProfile = () => {
    setTmpProfileImg(profileInfo.profileImg);
    setTmpNickname(profileInfo.nickname);
    setEditProfileMode(false);
  };

  const editProfile = () => {
    checkNicknameOverlap(tmpNickname);

    if (!nicknameOverlap) {
      if (!profileImgFile) {
        alert("프로필 사진을 등록해주세요!");
        return;
      }

      const formData = new FormData();
      formData.append("nickname", tmpNickname);
      formData.append("profileImage", profileImgFile);

      updateUserDetail(formData)
        .then((res) => {
          if (res.statusCode === 200) {
            const newProfileInfo = {
              nickname: tmpNickname,
              profileImg: tmpProfileImg,
              challenge: profileInfo.challenge,
              score: profileInfo.score,
              time: profileInfo.time,
            };
            setProfileInfo(newProfileInfo);
            setEditProfileMode(false);
          }
        })
        .catch((err) => console.log(err));
    }
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
              <span>회</span>
            </td>
            <td>
              {profileInfo.score}
              <span>점</span>
            </td>
            <td>
              {Math.round(profileInfo.time / 60)}
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
