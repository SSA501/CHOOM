import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Banner from "../Banner/Banner";
import { BannerIconsContainer, MainTopContainer } from "./style";
import { ReactComponent as Dance } from "./dance.svg";

function MainBanner() {
  return (
    <>
      <MainTopContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          loop={true}
          slidesPerView={1}
          pagination={true}
          autoplay={true}
        >
          <SwiperSlide>
            <Banner
              bgColor={"purple"}
              textTop={"지금 무슨 노래 듣고 계세요?"}
              textBottom={
                "C#OOM과 함께라면 유행하는 챌린지 뚝딱! AI와 함께 더욱 정확하고 쉽게 춤을 배워봐요"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <Banner
              bgColor={"darkgray"}
              textTop={"2번배너문구"}
              textBottom={
                "C#OOM과 함께라면 유행하는 챌린지 뚝딱! AI와 함께 더욱 정확하고 쉽게 춤을 배워봐요"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <Banner
              bgColor={"green"}
              textTop={"3번배너문구"}
              textBottom={
                "C#OOM과 함께라면 유행하는 챌린지 뚝딱! AI와 함께 더욱 정확하고 쉽게 춤을 배워봐요"
              }
            />
          </SwiperSlide>
        </Swiper>
      </MainTopContainer>
      <BannerIconsContainer>
        <Dance width={300} height={300} />
      </BannerIconsContainer>
    </>
  );
}

export default MainBanner;
