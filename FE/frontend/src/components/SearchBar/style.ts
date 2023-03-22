import styled from "styled-components";

const SearchContainer = styled.div`
  width: 40%;
  margin: 0 auto;
`;

const SearchCircle = styled.div`
  width: fit-content;
  background-color: black;
  color: white;
  border-radius: 50px;
  padding: 1em 2em;
  margin: 0 auto;
`;

const SearchBarContainer = styled.div`
  border-bottom: 5px solid black;
  color: black;
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
  font-size: 1.2rem;
  width: ${(props) => (props.value.length > 0 ? "calc(100% - 3em)" : null)};
  transition: 1s linear 0.1;
`;

export {
  SearchContainer,
  SearchBarContainer,
  SearchCircle,
  SearchIcon,
  SearchInput,
};
