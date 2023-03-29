import styled from "styled-components";

const SearchTopContainer = styled.div`
  margin-block: 30px 80px;
`;

const SideContainer = styled.div`
  float: left;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 400px;
`;

const SearchContainer = styled.div`
  height: 100px;
  padding: 1px 80px 1px 0px;

  & > div {
    height: 66px;
    margin: 32px;
    justify-content: start;
  }
`;

export { SearchTopContainer, SideContainer, SearchContainer };
