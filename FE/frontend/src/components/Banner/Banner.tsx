import React from "react";
import { string } from "yargs";
import {
  BannerContainer,
  BannerIconsContainer,
  BannerTextContainer,
} from "./style";

interface BannerProps {
  bgColor: string;
  textTop: string;
  textBottom: string;
  imgSrc: string;
  imgAlt: string;
}

function Banner({ bgColor, textTop, textBottom, imgSrc, imgAlt }: BannerProps) {
  return (
    <BannerContainer bgColor={bgColor}>
      <BannerTextContainer>
        <p>{textTop}</p>
        <p>{textBottom}</p>
      </BannerTextContainer>
      <BannerIconsContainer>
        <img style={{ width: "100%" }} src={imgSrc} alt={imgAlt} />
      </BannerIconsContainer>
    </BannerContainer>
  );
}

export default Banner;
