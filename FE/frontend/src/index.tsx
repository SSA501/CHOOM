import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { iconStyle, GlobalStyle } from "./styles/globalStyle";
import { IconContext } from "react-icons/lib";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStyle />
    <IconContext.Provider value={{ style: iconStyle }}>
      <App />
    </IconContext.Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
