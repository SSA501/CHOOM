import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
`;
const BtnContainer = styled.div<{ justify?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || "center"};
  padding: 12px;
`;
export { MainContainer, BtnContainer };
