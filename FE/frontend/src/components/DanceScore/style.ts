import styled, { css } from "styled-components";
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const EditIcon = styled.div<{ isEditing: boolean }>`
  position: relative;
  ${({ isEditing }) =>
    !isEditing &&
    css`
      span {
        visibility: hidden;
        position: absolute;
        width: 4.4em;
        background-color: var(--lightgray-color);
        color: var(--darkgray-color);
        text-align: center;
        padding: 5px;
        border-radius: 6px;
        bottom: 1.75em;
        margin-left: -2.5em;
      }
      :hover span {
        visibility: visible;
      }
    `}
`;

const ChallengeTitleContainer = styled.div`
  margin-left: 48px;
  padding: 1em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  h3,
  textarea {
    padding-right: 2em;
    line-height: 1.2em;
    font-size: 2em;
    font-weight: 600;
    flex: 1;
  }
  h3,
  textarea {
    resize: none;
    border: none;
    border-bottom: 3px solid black;
  }
`;

export { Header, EditIcon, ChallengeTitleContainer };
