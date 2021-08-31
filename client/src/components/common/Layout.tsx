import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import AppBar from "../AppBar";

import { kSize } from "../../utils/constants";


const useStyles = makeStyles(
  (theme) => (
    {
      container: {
        display: "static",
        width: "100vw",
        minHeight: `calc(100vh-(${kSize.TEMPLATE_HEADER_HEIGHT}+${kSize.TEMPLATE_FOOTER_HEIGHT}))`,
        overflowX: "scroll"
      }
    }
  )
);


interface LayoutProps {

}


const Layout: React.FC<LayoutProps> = ({ children }) => {

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <AppBar/>
      <main>
        {children}
      </main>
    </Box>
  );

};


export default Layout;
