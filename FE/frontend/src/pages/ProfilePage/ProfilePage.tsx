import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileVideoContainer from "../../components/ProfileVideoContainer/ProfileVideoContainer";
import NormalModal from "../../components/Modal/NormalModal";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { ProfileContainer } from "./style";

function ProfilePage() {
  const [normalModalOpen, setNormalModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const showNormalModal = () => {
    setNormalModalOpen(true);
  };

  const withdrawMember = () => {
    // TODO: 탈퇴하기 기능 구현
    alert("탈퇴 완료!");
    navigate("/");
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
