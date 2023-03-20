import React from "react";
import {
  BannerContainer,
  BannerIconsContainer,
  BannerTextContainer,
} from "./style";

function MainBanner() {
  return (
    <BannerContainer>
      <BannerTextContainer>
        <p>지금 무슨 노래 듣고 계세요?</p>
        <p>C#OOM과 함께라면 유행하는 챌린지 뚝딱!</p>
      </BannerTextContainer>
      <BannerIconsContainer>
        <img
          style={{ width: "100%" }}
          src="/assets/icons_main_shorts_tiktok.png"
          alt="쇼츠, 틱톡 아이콘"
        />
      </BannerIconsContainer>
    </BannerContainer>
  );
}

export default MainBanner;
