import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileVideoContainer from "../../components/ProfileVideoContainer/ProfileVideoContainer";
import NormalModal from "../../components/Modal/NormalModal";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { ProfileContainer } from "./style";
import { useAppDispatch } from "../../constants/types";
import { withdraw } from "../../apis/api";
import { updateAccessToken, updateLoginStatus } from "../../store/mainReducer";

function ProfilePage() {
  const [normalModalOpen, setNormalModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showNormalModal = () => {
    setNormalModalOpen(true);
  };

  const withdrawMember = () => {
    withdraw()
      .then(() => {
        // alert("탈퇴 완료!");
        dispatch(updateLoginStatus(false));
        dispatch(updateAccessToken(""));
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
          setNormalModalOpen={setNormalModalOpen}
          acceptModal={() => withdrawMember()}
        />
      )}
    </ProfileContainer>
  );
}

export default ProfilePage;
