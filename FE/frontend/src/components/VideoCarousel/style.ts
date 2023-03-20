import styled from "styled-components";

const SwiperContainer = styled.div`
  padding: 5em;
  width: 80%;
  margin: 0 auto;
  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 1.7em;
    padding: 1.2em 1em;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const ArrowBtn = styled.button`
  font-size: 2em;
`;

export { SwiperContainer, InnerContainer, ArrowBtn };
