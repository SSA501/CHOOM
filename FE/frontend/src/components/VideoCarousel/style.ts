import styled from "styled-components";

const CarouselContainer = styled.div<{ titleAlign?: string }>`
  padding: 5em;
  width: 80%;
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

const ArrowBtn = styled.button`
  font-size: 2em;
`;

export { SwiperContainer, CarouselContainer, ArrowBtn };
