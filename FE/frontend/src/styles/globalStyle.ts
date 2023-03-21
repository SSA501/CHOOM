import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  :root {
    /* Colors */
    --blue-color: #08439D;
    --green-color: #00A25E;
    --yellow-color: #FFE550;
    --pink-color: #F7B5CE;
    --orange-color: #EB6D15;
    --red-color: #CE2222;
    --lightblue-color:#CADFFF;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    color: var(--default-font-color);
    width: 100%;
    height: 100%;
    font-family: 'Pretendard-Regular', -apple-system, Helvetica Neue, sans-serif;
  }
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
  }
  input {
    border: none;
    background-color: inherit;
  }
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  abbr {
    text-decoration: none;
  }
  a,
  div,
  span,
  input,
  button,
  textarea {
    font-family: inherit;
  }
`;

export { GlobalStyle };
