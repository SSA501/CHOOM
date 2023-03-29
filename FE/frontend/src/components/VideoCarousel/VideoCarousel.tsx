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
import { Navigation, A11y } from "swiper";
import Video from "../../components/Video/Video";
import { VideoDataProps } from "../../pages/MainPage/MainPage";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/url";

interface VideoCarouselProps {
  videoData: VideoDataProps[];
  title: string | React.ReactNode;
  text?: string;
}

function VideoCarousel({ videoData, title, text }: VideoCarouselProps) {
  const [swiper, setSwiper] = useState<any>();
  const [reachingEnd, setReachingEnd] = useState<boolean>(false);
  const [reachingFirst, setReachingFirst] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleClickVideo = (youtubeId: number): void => {
    // TODO: 비디오 저장 요청해서 DB id 받아오기
    navigate(`/detail/${youtubeId}`);
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
        <img src="/assets/logo.png" alt="로고" width="150px" />
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
            {videoData?.map(
              ({ youtubeId, videoPath, thumbnailPath, title }) => (
                <SwiperSlide key={youtubeId}>
                  <Video
                    id={youtubeId}
                    title={title}
                    videoPath={`${SERVER_URL}${videoPath}`}
                    thumbnailPath={thumbnailPath}
                    handleClickVideo={() => handleClickVideo(youtubeId)}
                  />
                </SwiperSlide>
              )
            )}
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
