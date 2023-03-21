import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Banner from "../Banner/Banner";

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
        <Banner
          bgColor={"blue"}
          textTop={"지금 무슨 노래 듣고 계세요?"}
          textBottom={"C#OOM과 함께라면 유행하는 챌린지 뚝딱!"}
          imgSrc={"/assets/icons_main_shorts_tiktok.png"}
          imgAlt={"쇼츠, 틱톡 아이콘"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Banner
          bgColor={"pink"}
          textTop={"2번배너문구"}
          textBottom={"C#OOM과 함께라면 유행하는 챌린지 뚝딱!"}
          imgSrc={"/assets/icons_main_shorts_tiktok.png"}
          imgAlt={"쇼츠, 틱톡 아이콘"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Banner
          bgColor={"green"}
          textTop={"3번배너문구"}
          textBottom={"C#OOM과 함께라면 유행하는 챌린지 뚝딱!"}
          imgSrc={"/assets/icons_main_shorts_tiktok.png"}
          imgAlt={"쇼츠, 틱톡 아이콘"}
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default MainBanner;
