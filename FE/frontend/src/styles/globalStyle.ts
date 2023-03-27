import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// react icons 스타일
export const iconStyle = {
  verticalAlign: "middle",
  fontSize: "1.5rem",
  cursor: "pointer",
};

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "Combined";
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Combined';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
}

  :root {
    /* Colors */
    --purple-color:#EBB1FF;
    --green-color:#B6F56A;
    --lightgray-color:#F2F2F2;
    --darkgray-color:#3A3A3A;
    --black-color:#000000;
    --white-color:#FFFFFF;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Combined', -apple-system, Helvetica Neue, sans-serif;
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
