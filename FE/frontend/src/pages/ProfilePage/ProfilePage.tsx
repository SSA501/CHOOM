import React, { useState } from "react";
import SmallMenu from "../../components/SmallMenu/SmallMenu";
import NormalModal from "../../components/Modal/NormalModal";
import { Header, SettingBtn, DropBtn } from "./style";
import { FiSettings } from "react-icons/fi";
import { TbTriangle, TbTriangleInverted } from "react-icons/tb";

function ProfilePage() {
  const [smallMenuOpen, setSmallMenuOpen] = useState(false);
  const [selectedDropMenu, setSelectedDropMenu] = useState("높은 등급순");
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const [normalModalOpen, setNormalModalOpen] = useState(false);

  const showSmallMenu = () => {
    setSmallMenuOpen(!smallMenuOpen);
  };

  const showDropMenu = () => {
    setDropMenuOpen(!dropMenuOpen);
  };

  const showNormalModal = () => {
    setNormalModalOpen(true);
  };

  const menuItemList = [
    { name: "프로필 편집", handleClick: () => alert("프로필 편집!!") },
    { name: "로그아웃", handleClick: () => alert("로그아웃!!") },
    { name: "탈퇴하기", handleClick: () => showNormalModal() },
  ];

  const dropMenuItemList = [
    {
      name: "높은 등급순",
      handleClick: () => {
        setSelectedDropMenu("높은 등급순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "낮은 등급순",
      handleClick: () => {
        setSelectedDropMenu("낮은 등급순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "최신순",
      handleClick: () => {
        setSelectedDropMenu("최신순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
    {
      name: "오래된순",
      handleClick: () => {
        setSelectedDropMenu("오래된순");
        setDropMenuOpen(!dropMenuOpen);
      },
    },
  ];

  return (
    <div>
      <Header>My Profile</Header>
      <SettingBtn onClick={showSmallMenu}>
        <FiSettings fontSize={"29px"} />
      </SettingBtn>
      {smallMenuOpen && <SmallMenu itemList={menuItemList}></SmallMenu>}

      <br />
      <DropBtn onClick={showDropMenu}>
        {dropMenuOpen && <TbTriangle />}
        {!dropMenuOpen && <TbTriangleInverted />}
        {selectedDropMenu}
      </DropBtn>
      {dropMenuOpen && <SmallMenu itemList={dropMenuItemList}></SmallMenu>}

      {normalModalOpen && (
        <NormalModal
          setNormalModalOpen={setNormalModalOpen}
          acceptModal={() => alert("탈퇴하기!!")}
        />
      )}
    </div>
  );
}

export default ProfilePage;
