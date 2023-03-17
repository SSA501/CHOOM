import React from "react";
import { SwiperContainer } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import Video from "../../components/Video/Video";
import { videoData } from "../../pages/MainPage/MainPage";

interface VideoCarouselProps {
  videoData: videoData[];
}

function VideoCarousel({ videoData }: VideoCarouselProps) {
  return (
    <SwiperContainer>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <div>
          {videoData.map(({ id, videoSrc, thumbnailSrc }) => (
            <SwiperSlide key={id}>
              <Video
                id={id}
                videoSrc={videoSrc}
                thumbnailSrc={thumbnailSrc}
                bgFrame="blue"
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </SwiperContainer>
  );
}

export default VideoCarousel;
