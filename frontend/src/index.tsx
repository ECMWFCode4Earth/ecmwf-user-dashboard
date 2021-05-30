import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {NoSsr} from "@material-ui/core";

import App from './App';
import {theme} from "./styles/theme";


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <NoSsr>
                <App/>
            </NoSsr>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
