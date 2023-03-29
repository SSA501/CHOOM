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
import { addDance } from "../../apis/challenge";

interface VideoCarouselProps {
  videoData: VideoDataProps[];
  title: string | React.ReactNode;
  text?: string;
  isSearch?: boolean; // 검색에서 표시되어서 DB에 있는 동영상이 아닐 때
}

function VideoCarousel({
  videoData,
  title,
  text,
  isSearch,
}: VideoCarouselProps) {
  const [swiper, setSwiper] = useState<any>();
  const [reachingEnd, setReachingEnd] = useState<boolean>(false);
  const [reachingFirst, setReachingFirst] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleClickVideo = (videoID: string | null): void => {
    if (isSearch) {
      // 서치에서 보여주는 비디오일 경우 (DB에 저장 안되어 있는 경우) 저장 요청
      addDance(videoID)
        .then((res) => {
          console.log(res.data.danceId);
          const danceId = res.data.danceId;
          navigate(`/detail/${danceId}`);
        })
        .catch((err) => console.log(err));
    } else {
      navigate(`/detail/${videoID}`);
    }
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
            {videoData?.map(({ id, videoPath, thumbnailPath, title }) => (
              <SwiperSlide key={id}>
                <Video
                  title={title}
                  videoPath={`${SERVER_URL}${videoPath}`}
                  thumbnailPath={thumbnailPath}
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
