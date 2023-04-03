import styled from "styled-components";

const RecentSearchContainer = styled.div``;

const SearchItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 25px 50px 0 0;

  & > p {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    margin-top: 50px;
  }
`;

const SearchItem = styled.div`
  position: relative;
  width: fit-content;
  height: 56px;
  padding: 15px 75px 15px 60px;
  margin: 17px 46px 17px 0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: white;
  background-color: var(--darkgray-color);

  & > p {
    cursor: pointer;
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);

  & > svg {
    font-size: 26px !important;
    color: white;
  }
`;

export { RecentSearchContainer, SearchItemContainer, SearchItem, RemoveBtn };
