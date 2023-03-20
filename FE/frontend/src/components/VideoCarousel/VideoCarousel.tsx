import React, { useState } from "react";
import { ArrowBtn, CarouselContainer, SwiperContainer } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Video from "../../components/Video/Video";
import { VideoData } from "../../pages/MainPage/MainPage";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface VideoCarouselProps {
  videoData: VideoData[];
  title: string;
  titleAlign?: string;
}

function VideoCarousel({ videoData, title, titleAlign }: VideoCarouselProps) {
  const [swiper, setSwiper] = useState<any>();
  const [reachingEnd, setReachingEnd] = useState<boolean>(false);
  const [reachingFirst, setReachingFirst] = useState<boolean>(true);

  return (
    <CarouselContainer titleAlign={titleAlign}>
      <h2>{title}</h2>
      <SwiperContainer>
        <ArrowBtn onClick={() => swiper?.slidePrev()} disabled={reachingFirst}>
          <MdKeyboardArrowLeft fill={reachingFirst ? "#D4D2D9" : "#08439D"} />
        </ArrowBtn>
        <Swiper
          modules={[Navigation, A11y]}
          // loop={true}
          spaceBetween={50}
          slidesPerView={3}
          // navigation
          onBeforeInit={(swipper: SwiperCore): void => setSwiper(swipper)}
          onSlideChange={(e) => {
            e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
            e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
          }}
        >
          <div>
            {videoData.map(({ id, videoSrc, thumbnailSrc, frameColor }) => (
              <SwiperSlide key={id}>
                <Video
                  id={id}
                  videoSrc={videoSrc}
                  thumbnailSrc={thumbnailSrc}
                  frameColor={frameColor}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <ArrowBtn onClick={() => swiper?.slideNext()} disabled={reachingEnd}>
          <MdKeyboardArrowRight fill={reachingEnd ? "#D4D2D9" : "#08439D"} />
        </ArrowBtn>
      </SwiperContainer>
    </CarouselContainer>
  );
}

export default VideoCarousel;
