import React, { useState } from "react";
import {
  ArrowBtn,
  ArrowBtnContainer,
  CarouselContainer,
  CarouselTitle,
  LeftTextContainer,
  MiddleText,
  RightSwiperContainer,
} from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Video from "../../components/Video/Video";
import { VideoDataProps } from "../../pages/MainPage/MainPage";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Btn from "../Btn/Btn";
import { useNavigate } from "react-router-dom";

interface VideoCarouselProps {
  videoData: VideoDataProps[];
  title: string | React.ReactNode;
  text?: string;
  handleBtnClick: () => void;
}

function VideoCarousel({
  videoData,
  title,
  text,
  handleBtnClick,
}: VideoCarouselProps) {
  const [swiper, setSwiper] = useState<any>();
  const [reachingEnd, setReachingEnd] = useState<boolean>(false);
  const [reachingFirst, setReachingFirst] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleClickVideo = (videoId: number): void => {
    navigate(`/detail/${videoId}`);
  };

  return (
    <CarouselContainer width="90%" padding="5em" bgColor="lightgray">
      <LeftTextContainer>
        <CarouselTitle>
          <h2>{title}</h2>
        </CarouselTitle>
        <MiddleText>
          <p>{text}</p>
        </MiddleText>
        <Btn btnText={"더보기"} margin={"0"} handleClick={handleBtnClick} />
      </LeftTextContainer>
      <RightSwiperContainer>
        <ArrowBtnContainer>
          <ArrowBtn
            onClick={() => swiper?.slidePrev()}
            disabled={reachingFirst}
          >
            <MdKeyboardArrowLeft fill={reachingFirst ? "#D4D2D9" : "#000000"} />
          </ArrowBtn>
        </ArrowBtnContainer>
        <Swiper
          modules={[Navigation, A11y]}
          // loop={true}
          width={900}
          // spaceBetween={10}
          slidesPerView={3}
          // navigation
          onBeforeInit={(swipper: SwiperCore): void => setSwiper(swipper)}
          onSlideChange={(e) => {
            e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
            e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
          }}
        >
          <div>
            {videoData?.map(({ id, videoPath, thumbnailSrc, title }) => (
              <SwiperSlide key={id}>
                <Video
                  id={id}
                  title={title}
                  videoPath={videoPath}
                  thumbnailSrc={thumbnailSrc}
                  handleClickVideo={() => handleClickVideo(id)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <ArrowBtnContainer>
          <ArrowBtn onClick={() => swiper?.slideNext()} disabled={reachingEnd}>
            <MdKeyboardArrowRight fill={reachingEnd ? "#D4D2D9" : "#000000"} />
          </ArrowBtn>
        </ArrowBtnContainer>
      </RightSwiperContainer>
    </CarouselContainer>
  );
}

export default VideoCarousel;
