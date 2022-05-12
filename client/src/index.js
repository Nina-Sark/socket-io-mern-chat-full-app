import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import { Provider } from "react-redux";
import store from "./state/store";
import SocketProvider from "./socket";

ReactDOM.render(
  <SocketProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </SocketProvider>,
  document.getElementById("root")
);
