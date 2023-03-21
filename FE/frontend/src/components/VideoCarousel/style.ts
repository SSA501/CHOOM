import styled from "styled-components";

const CarouselContainer = styled.div<{ titleAlign?: string }>`
  padding: 3em 1em;
  width: 90%;
  max-width: 1330px;
  margin: 0 auto;
  h2 {
    text-align: ${(props) => props.titleAlign || ""};
    font-weight: 600;
    font-size: 1.7em;
    padding: 1.2em 0 1em;
  }
`;

const SwiperContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const ArrowBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowBtn = styled.button`
  font-size: 2em;
`;

export { SwiperContainer, CarouselContainer, ArrowBtnContainer, ArrowBtn };
