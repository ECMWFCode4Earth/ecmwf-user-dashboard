/**
 * Theme configuration used by Material UI.
 * */

import { createMuiTheme } from '@material-ui/core/styles';


/**
 *  Notes
 * - Uses 8px scaling factor by default.
 * */
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body': {
          backgroundColor: 'white',
          minHeight: '100vh',
          overscrollBehavior: 'none',
        },
        "a": {
          textDecoration: "none",
          color: "inherit",
        }
      },
    },
  },
});


export { theme };