import styled from "styled-components";

const LikeBtnOuterContainer = styled.div`
  position: relative;
  width: 72px;
  height: 58px;
`;

const LikeBtnContentContainer = styled.div`
  width: 72px;
  position: absolute;
  text-align: center;
  top: 36%;
  left: 45%;
  transform: translate(-50%, -50%);
`;

export { LikeBtnOuterContainer, LikeBtnContentContainer };
