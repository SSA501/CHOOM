import styled, { css } from "styled-components";

const ProfileDiv = styled.div`
  width: 100%;
  height: -webkit-calc(100vh - 160px);
`;

const LeftDiv = styled.div`
  width: 28%;
  min-width: 360px;
  height: 100%;
  text-align: center;
  float: left;
`;

const RightDiv = styled.div`
  width: 72%;
  height: 100%;
  padding-left: 40px;
  padding-right: 100px;
  float: left;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 86px;
  padding-top: 16px;
  color: #000000;
`;

const ListHeader = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  margin-top: 20px;
  border-bottom: 5px solid #3a3a3a;

  & > span {
    font-size: 24px;
    line-height: 60px;
  }
`;

const ListHeaderBtn = styled.button<{ selected: boolean }>`
  width: 150px;
  height: 70px;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 40px;
  ${(props) =>
    props.selected &&
    css`
      color: var(--blue-color);
    `}
`;

const DropBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 4px;
  width: 165px;
  height: 41px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  float: right;
`;

const VideoList = styled.div`
  width: 100%;
  height: -webkit-calc(100vh - 170px);
  padding-inline: 40px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;

  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* FireFox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera, Edge */
  }
`;

const VideoItem = styled.div`
  width: 250px;
  margin: 15px;
`;

export {
  ProfileDiv,
  LeftDiv,
  RightDiv,
  Header,
  ListHeader,
  ListHeaderBtn,
  DropBtn,
  VideoList,
  VideoItem,
};
