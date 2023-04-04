import styled from "styled-components";
const TitleContainer = styled.div<{ marginTop?: string }>`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.marginTop || "22px"};
`;
const TitleBar = styled.div`
  height: 92px;
  margin-left: 36px;
  margin-right: 22px;
  width: 12px;
  border: 6px solid black;
  border-radius: 1rem;
`;
const TitleText = styled.div`
  word-break: break-all;
  font-size: 36px;
  line-height: 44px;
  vertical-align: middle;
  font-weight: bold;
  margin-right: 10%;
`;
export { TitleBar, TitleContainer, TitleText };
