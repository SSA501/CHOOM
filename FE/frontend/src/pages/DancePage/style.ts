import styled from "styled-components";

const DancePageContainer = styled.div`
  width: calc(100% - 100px);
  height: calc(100vh - 100px);
  margin: 50px;
  border: 3px solid black;
`;

const TitleContainer = styled.div`
  border-bottom: 3px solid black;
  font-size: 48px;
  padding-bottom: 16px;
  width: 62.5%;
  margin-left: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const DanceVideoContainer = styled.div<{ type: "left" | "right" }>`
  width: 50%;
  height: calc(100% - 127px);
  float: ${(props) => (props.type === "left" ? "left" : "right")};
  position: relative;
`;

export { DanceVideoContainer, DancePageContainer, TitleContainer };
