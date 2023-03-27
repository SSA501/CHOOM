import styled from "styled-components";
const TitleContainer = styled.div<{ marginTop?: string }>`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.marginTop || "22px"};
`;
const TitleBar = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-bottom: 22px;
  border: 2px solid black;
  border-radius: 1rem;
`;
const TitleText = styled.div`
  margin: 8px 0 8px 10%;
  font-size: 22px;
`;
export { TitleBar, TitleContainer, TitleText };
