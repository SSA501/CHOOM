import styled from "styled-components";
import { ShadowContainer } from "../ShadowContainer/style";

type ChildrenProp = {
  children: React.ReactNode;
};

const CarouselContainer = styled(ShadowContainer)<ChildrenProp>`
  display: flex;
  gap: 2em;
  padding: 5em 3.5em;
`;

const LeftTextContainer = styled.div`
  /* flex: 3; */
  width: 17%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CarouselTitle = styled.div`
  font-weight: bolder;
  font-size: 3rem;
  line-height: 1.2em;
  max-width: 20rem;
  word-break: keep-all;
`;

const MiddleText = styled.div`
  line-height: 1.5em;
  word-break: keep-all;
`;

const RightSwiperContainer = styled.div`
  display: flex;
  gap: 1em;
  flex: 1;
  /* max-width: 967px; */
  overflow: hidden;
`;

const ArrowBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowBtn = styled.button`
  font-size: 2em;
`;

export {
  RightSwiperContainer,
  LeftTextContainer,
  CarouselTitle,
  MiddleText,
  CarouselContainer,
  ArrowBtnContainer,
  ArrowBtn,
};
