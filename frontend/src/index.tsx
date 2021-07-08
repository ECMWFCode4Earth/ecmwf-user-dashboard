import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NoSsr } from "@material-ui/core";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import App from "./App";
import WidgetBuilderProvider from "./library/contexts/WidgetBuilderContext";
import { theme } from "./styles/theme";
import GlobalContextProvider from "./library/contexts/GlobalContext";


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NoSsr>
        <GlobalContextProvider>
          <WidgetBuilderProvider>
            <App/>
          </WidgetBuilderProvider>
        </GlobalContextProvider>
      </NoSsr>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementsByClassName("ecmwf-template__content-wrapper")[1]
);
