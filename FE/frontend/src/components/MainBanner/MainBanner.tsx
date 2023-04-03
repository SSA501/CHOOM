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
                "C#OOM과 함께라면 유행하는 챌린지 뚝딱! AI와 함께 더욱 정확하고 쉽게 춤을 배워보세요!"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <Banner
              bgColor={"darkgray"}
              textTop={"몸치라서, 아싸라서 두렵다면?"}
              textBottom={
                "C#OOM은 AI가 가이드를 제공해주어 어디서든 혼자 출 수 있어요. 몸치, 아싸 이런 걱정은 벗어던지고 지금 바로 챌린지에 참여해봐요!"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <Banner
              bgColor={"green"}
              textTop={"재미없는 다이어트는 이제 그만!"}
              textBottom={
                "C#OOM에서 인기 있는 다양한 댄스 챌린지를 통해 나의 리듬과 일치율을 확인하며, 즐겁게 다이어트 해보세요!"
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
