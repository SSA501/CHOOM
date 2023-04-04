import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileVideoContainer from "../../components/ProfileVideoContainer/ProfileVideoContainer";
import NormalModal from "../../components/Modal/NormalModal";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { ProfileContainer } from "./style";
import { useAppDispatch } from "../../constants/types";
import { withdraw } from "../../apis/user";
import { updateAccessToken, updateLoginStatus } from "../../store/authReducer";

function ProfilePage() {
  const [normalModalOpen, setNormalModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showNormalModal = () => {
    document.body.style.overflow = "hidden";
    setNormalModalOpen(true);
  };

  const withdrawMember = () => {
    document.body.style.overflow = "auto";
    withdraw()
      .then(() => {
        dispatch(updateLoginStatus(false));
        dispatch(updateAccessToken(""));
        alert("탈퇴 완료되었습니다.");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <ProfileContainer>
      <ProfileCard showNormalModal={showNormalModal} />
      <ProfileVideoContainer />
      {normalModalOpen && (
        <NormalModal
          modalText={"정말 탈퇴할까요?"}
          setNormalModalOpen={setNormalModalOpen}
          acceptModal={() => withdrawMember()}
        />
      )}
    </ProfileContainer>
  );
}

export default ProfilePage;
