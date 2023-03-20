import styled from "styled-components";

const DanceVideoContainer = styled.div`
  width: 50%;
  height: calc(100% - 127px);
  float: left;
  position: relative;
`;

const VideoContainer = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CircleBtn = styled.button<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: calc(50% + 230px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  text-decoration: none;
  border: none;
  cursor: pointer;
`;
export { DanceVideoContainer, VideoContainer, CircleBtn };
