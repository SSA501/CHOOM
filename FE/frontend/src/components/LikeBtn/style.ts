import styled from "styled-components";

const LikeBtnOuterContainer = styled.div`
  position: relative;
`;

const LikeBtnContentContainer = styled.div`
  width: 72px;
  position: absolute;
  text-align: center;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export { LikeBtnOuterContainer, LikeBtnContentContainer };
