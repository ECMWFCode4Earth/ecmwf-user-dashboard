import { createMuiTheme } from "@material-ui/core/styles";

import { kColor, kFont, kFontFamily } from "../library/constants/constants";


/**
 *  Notes
 * - Uses 8px scaling factor by default.
 * */
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body": {
          backgroundColor: "white",
          minHeight: "100vh", // TODO Calculate using subtracting Navbar height
          overscrollBehavior: "none",
        },
        "a": {
          textDecoration: "none",
          color: "inherit",
        },
        ".react-grid-item.react-grid-placeholder": { // This CSS selector is React-Grid-Layout specific.
          background: "lightBlue"
        }
      },
    },
  },
  palette: {
    grey: kColor.GREY,
    text: {
      primary: kColor.BLACK,
    }
  },
  typography: {
    fontFamily: kFontFamily.BODY,
    h1: kFont.HEADING_2XL,
    h2: kFont.HEADING_XL,
    h3: kFont.HEADING_LG,
    h4: kFont.HEADING_MD,
    h5: kFont.HEADING_SM,
    h6: kFont.HEADING_XS,
    body1: kFont.BODY_MD,
    body2: kFont.BODY_SM,
    caption: kFont.BODY_XS,
  },
  shape: {
    borderRadius: 3
  }
});


export { theme };