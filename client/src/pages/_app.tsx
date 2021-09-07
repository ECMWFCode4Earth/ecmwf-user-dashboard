import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, NoSsr } from "@material-ui/core";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { theme } from "../styles/theme";

import AuthContextProvider from "../utils/contexts/AuthContext";
import TabManagerProvider from "../utils/contexts/TabManagerContext";


/**
 * Wrap app around contexts.
 * */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NoSsr>
        <AuthContextProvider>
          <TabManagerProvider>
            <Component {...pageProps} />
          </TabManagerProvider>
        </AuthContextProvider>
      </NoSsr>
    </ThemeProvider>
  );
}


export default MyApp;
