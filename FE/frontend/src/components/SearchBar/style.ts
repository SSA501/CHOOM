import styled from "styled-components";

const SearchBarContainer = styled.div`
  color: black;
  margin: 0 auto;
  form {
    padding: 1em 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 5px solid black;
  }
`;

const SearchIcon = styled.div`
  display: inline-block;
  margin: 0.3em 1em 0 0;
`;

const SearchInput = styled.input`
  font-size: 1.2rem;
  transition: 1s linear 0.1;
  flex: 1;
`;

const SearchBtn = styled.button`
  width: fit-content;
  background-color: black;
  color: white;
  border-radius: 50px;
  padding: 1em 2em;
  margin-left: 1em;
`;

export { SearchBarContainer, SearchIcon, SearchInput, SearchBtn };
