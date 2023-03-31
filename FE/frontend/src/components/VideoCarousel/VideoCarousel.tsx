import React, { useState, useEffect } from "react";
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
import { useAppSelector } from "../../constants/types";
import LoginModal from "../Modal/LoginModal";

interface VideoCarouselProps {
  videoData: VideoDataProps[];
  title: string | React.ReactNode;
  text?: string;
  isSearch?: boolean;
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
  const isLogin = useAppSelector(
    (state) => state && state.main && state.main.isLogin
  );
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // const showLoginModal = () => {
  //   if (setLoginModalOpen) setLoginModalOpen(true); // setLoginModalOpen이 undefined 인 경우 대비
  //   document.body.style.overflow = "hidden";
  // };

  const handleClickVideo = (videoID: number | string | null): void => {
    if (!isLogin) {
      // showLoginModal();
      setLoginModalOpen(true);
      return;
    }
    if (typeof videoID === "string") {
      // 서치에서 보여주는 비디오 중 DB에 저장 안되어 있는 경우 저장 요청
      addDance(videoID)
        .then((res) => {
          const danceId = res.data.danceId;
          navigate(`/detail/${danceId}`);
        })
        .catch((err) => console.log(err));
    } else {
      navigate(`/detail/${videoID}`);
    }
  };

  useEffect(() => {
    if (videoData?.length <= 3) setReachingEnd(true);
  }, [videoData]);

  return (
    <>
      <CarouselContainer width="90%" bgColor="lightgray">
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
              <MdKeyboardArrowLeft
                fill={reachingFirst ? "#D4D2D9" : "#000000"}
              />
            </ArrowBtn>
          </ArrowBtnContainer>
          <Swiper
            modules={[Navigation, A11y]}
            // loop={true}
            width={1220}
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
                ({ id, youtubeId, url, videoPath, thumbnailPath, title }) => (
                  <SwiperSlide key={title}>
                    <Video
                      id={id}
                      url={url}
                      title={title}
                      videoPath={`${SERVER_URL}${videoPath}`}
                      thumbnailPath={thumbnailPath}
                      handleClickVideo={() => {
                        isSearch
                          ? handleClickVideo(youtubeId)
                          : handleClickVideo(id);
                      }}
                    />
                  </SwiperSlide>
                )
              )}
            </div>
          </Swiper>
          <ArrowBtnContainer>
            <ArrowBtn
              onClick={() => swiper?.slideNext()}
              disabled={reachingEnd}
            >
              <MdKeyboardArrowRight
                fill={reachingEnd ? "#D4D2D9" : "#000000"}
              />
            </ArrowBtn>
          </ArrowBtnContainer>
        </RightSwiperContainer>
      </CarouselContainer>
      {loginModalOpen && <LoginModal setLoginModalOpen={setLoginModalOpen} />}
    </>
  );
}

export default VideoCarousel;
