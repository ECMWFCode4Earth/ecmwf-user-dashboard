import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, NoSsr } from "@material-ui/core";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { theme } from "../styles/theme";

import GlobalContextProvider from "../utils/contexts/GlobalContext";
import AuthContextProvider from "../utils/contexts/AuthContext";
import WidgetBuilderProvider from "../utils/contexts/WidgetBuilderContext";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NoSsr>
        <GlobalContextProvider>
          <AuthContextProvider>
            <WidgetBuilderProvider>
              <Component {...pageProps} />
            </WidgetBuilderProvider>
          </AuthContextProvider>
        </GlobalContextProvider>
      </NoSsr>
    </ThemeProvider>

  );
}


export default MyApp;
