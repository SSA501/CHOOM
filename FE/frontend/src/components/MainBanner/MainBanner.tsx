import React from "react";
import {
  BannerContainer,
  BannerIconsContainer,
  BannerTextContainer,
} from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MainBanner() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, A11y]}
      loop={true}
      slidesPerView={1}
      pagination={true}
      autoplay={true}
    >
      <SwiperSlide>
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
      </SwiperSlide>
      <SwiperSlide>
        <BannerContainer>
          <BannerTextContainer>
            <p>2번문구</p>
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
      </SwiperSlide>
      <SwiperSlide>
        <BannerContainer>
          <BannerTextContainer>
            <p>3번문구</p>
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
      </SwiperSlide>
    </Swiper>
  );
}

export default MainBanner;
