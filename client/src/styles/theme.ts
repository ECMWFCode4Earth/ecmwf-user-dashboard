import { createTheme } from "@material-ui/core/styles";

import { kColor } from "../utils/constants";


/**
 *  Notes
 * - Uses 8px scaling factor by default.
 * */
const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body": {
          backgroundColor: "white",
          minHeight: "100vh",
          overscrollBehavior: "none",
        },
        "a": {
          textDecoration: "none",
          color: "inherit",
        },
        ".react-grid-item.react-grid-placeholder": { // This CSS selector is React-Grid-Layout specific. Consult documentation.
          background: "lightBlue",
        }
      },
    },
  },
  palette: {
    primary: {
      main: kColor.PRIMARY.MAIN,
    },
    secondary: {
      main: kColor.SECONDARY.MAIN,
    },
    text: {
      primary: kColor.TEXT_BLACK,
    }
  },
  shape: {
    borderRadius: 3
  }
});


export { theme };
