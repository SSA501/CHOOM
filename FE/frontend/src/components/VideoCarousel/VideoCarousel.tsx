import React, { useState } from "react";
import { ArrowBtn, InnerContainer, SwiperContainer } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Video from "../../components/Video/Video";
import { videoData } from "../../pages/MainPage/MainPage";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface VideoCarouselProps {
  videoData: videoData[];
}

function VideoCarousel({ videoData }: VideoCarouselProps) {
  const [swiper, setSwiper] = useState<any>();
  const [reachingEnd, setReachingEnd] = useState<boolean>(false);
  const [reachingFirst, setReachingFirst] = useState<boolean>(true);

  return (
    <SwiperContainer>
      <h2>요즘 인기있는 챌린지 🔥</h2>
      <InnerContainer>
        <ArrowBtn onClick={() => swiper?.slidePrev()} disabled={reachingFirst}>
          <MdKeyboardArrowLeft fill={reachingFirst ? "#D4D2D9" : "#08439D"} />
        </ArrowBtn>
        <Swiper
          modules={[Navigation, A11y]}
          // loop={true}
          spaceBetween={50}
          slidesPerView={3}
          // navigation
          onBeforeInit={(swipper: SwiperCore): void => {
            setSwiper(swipper);
            console.log(swipper);
          }}
          onSlideChange={(e) => {
            e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
            e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
          }}
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
        <ArrowBtn onClick={() => swiper?.slideNext()} disabled={reachingEnd}>
          <MdKeyboardArrowRight fill={reachingEnd ? "#D4D2D9" : "#08439D"} />
        </ArrowBtn>
      </InnerContainer>
    </SwiperContainer>
  );
}

export default VideoCarousel;
