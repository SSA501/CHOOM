import styled from "styled-components";

const SearchBarContainer = styled.div`
  position: absolute;
  bottom: -1.5em;
  z-index: 1;
  background-color: black;
  color: white;
  width: 90%;
  margin: 0 auto;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.div`
  display: inline-block;
  margin: 0.3em 1em 0 0;
`;

const SearchInput = styled.input<{ value: string }>`
  color: white;
  font-size: 1.2rem;
  width: ${(props) => (props.value.length > 0 ? "calc(100% - 3em)" : null)};
  transition: 1s linear 0.1;
`;

export { SearchBarContainer, SearchIcon, SearchInput };
