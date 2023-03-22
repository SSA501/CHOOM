import React from "react";
import { BannerContainer, BannerTextContainer } from "./style";

interface BannerProps {
  bgColor: string;
  textTop: string;
  textBottom: string;
}

function Banner({ bgColor, textTop, textBottom }: BannerProps) {
  return (
    <BannerContainer bgColor={bgColor}>
      <BannerTextContainer>
        <p>{textTop}</p>
        <p>{textBottom}</p>
      </BannerTextContainer>
    </BannerContainer>
  );
}

export default Banner;
