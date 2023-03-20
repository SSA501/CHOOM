import styled from "styled-components";

const DancePageContainer = styled.div`
  height: calc(100vh - 150px);
  margin-inline: 200px;
  margin-top: 35px;
  border: 3px solid black;
`;

const TitleContainer = styled.div`
  border-bottom: 3px solid black;
  font-size: 32px;
  padding-bottom: 16px;
  width: 40%;
  margin: 16px auto;
  text-align: center;
`;

const DanceVideoContainer = styled.div<{ type: "left" | "right" }>`
  width: 50%;
  height: calc(100% - 127px);
  float: ${(props) => (props.type === "left" ? "left" : "right")};
  position: relative;
`;

export { DanceVideoContainer, DancePageContainer, TitleContainer };
