import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { iconStyle, GlobalStyle } from "./styles/globalStyle";
import { IconContext } from "react-icons/lib";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <IconContext.Provider value={{ style: iconStyle }}>
          <App />
        </IconContext.Provider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
