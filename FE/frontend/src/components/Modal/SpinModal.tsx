import React from "react";
import { Modal, Background } from "./style";
import { ShadowContainer } from "../ShadowContainer/style";
import Spinner from "../Spinner/Spinner";
function SpinModal() {
  return (
    <div>
      <Background />
      <Modal width={"500px"} height={"400px"}>
        <ShadowContainer
          width={"400px"}
          height={"400px"}
          bgColor={"white"}
          padding={"3em 0px"}
        >
          <Spinner />
          <div style={{ fontWeight: 900, fontSize: "21px" }}>
            춤분석중... 기다려주세요💃
          </div>
        </ShadowContainer>
      </Modal>
    </div>
  );
}

export default SpinModal;
