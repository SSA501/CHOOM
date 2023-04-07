import React, { useCallback, useEffect, useRef, useState } from "react";
import { Background, CloseBtn, Modal, RankTopContainer } from "./style";
import { ShadowContainer } from "../ShadowContainer/style";
import { CgClose } from "react-icons/cg";
import { getUserDetail } from "../../apis/user";
import { InfoDetail } from "../ProfileCard/style";

interface RankModalProps {
  setModalOpen: (normalModalOpen: boolean) => void;
  userId: number;
  nickname: string;
  profileImage: string;
}

function RankModal({
  setModalOpen,
  userId,
  nickname,
  profileImage,
}: RankModalProps) {
  const [userDetail, setUserDetail] = useState({
    averageScore: 0,
    challengeCount: 0,
    challengeTime: 0,
  });
  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  }, [setModalOpen]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUserDetail(userId)
      .then((res) => {
        console.log(res);
        setUserDetail(res?.data?.userMyDanceDto);
      })
      .catch((err) => console.log(err));

    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [closeModal, userId]);

  return (
    <div>
      <Background opacity={"0.2"} />
      <Modal ref={modalRef} width={"500px"} height={"400px"}>
        <ShadowContainer
          width={"500px"}
          height={"400px"}
          bgColor={"white"}
          padding={"3em 0px"}
        >
          <CloseBtn right={"35px"} onClick={closeModal}>
            <CgClose fontSize="30px" />
          </CloseBtn>
          <RankTopContainer>
            <img
              src={profileImage}
              width="100px"
              height="100px"
              alt={`${nickname}님의 프로필 사진`}
            />
            <p>{nickname}</p>
          </RankTopContainer>
          <InfoDetail>
            <tbody>
              <tr>
                <td>챌린지</td>
                <td>점수</td>
                <td>시간</td>
              </tr>
              <tr>
                <td>
                  {userDetail?.challengeCount}
                  <span>회</span>
                </td>
                <td>
                  {userDetail?.averageScore}
                  <span>점</span>
                </td>
                <td>
                  {Math.ceil(userDetail?.challengeTime / 60)}
                  <span>분</span>
                </td>
              </tr>
            </tbody>
          </InfoDetail>
        </ShadowContainer>
      </Modal>
    </div>
  );
}

export default RankModal;
