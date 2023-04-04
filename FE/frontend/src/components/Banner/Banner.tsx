import React from "react";
import {
  BannerContainer,
  BannerTextContainer,
  LeftImg,
  RightImg,
} from "./style";

interface BannerProps {
  bgColor: string;
  textTop: string;
  textBottom: string;
  LeftImgSrc: string;
  RightImgSrc: string;
}

function Banner({
  bgColor,
  textTop,
  textBottom,
  LeftImgSrc,
  RightImgSrc,
}: BannerProps) {
  return (
    <BannerContainer bgColor={bgColor}>
      <BannerTextContainer>
        <p>{textTop}</p>
        <p>{textBottom}</p>
      </BannerTextContainer>
      <LeftImg src={LeftImgSrc} alt="banner img" />
      <RightImg src={RightImgSrc} alt="banner img" />
    </BannerContainer>
  );
}

export default Banner;
