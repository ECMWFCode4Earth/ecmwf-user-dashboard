import React from "react";
import { makeStyles, Box } from "@material-ui/core";

import AppBar from "./AppBar";

import { kSize } from "../../utils/constants";
import WidgetToolbar from "../WidgetToolbar";


interface LayoutProps {
  showWidgetToolbar?: boolean
}


const Layout: React.FC<LayoutProps> = ({ children, showWidgetToolbar }) => {

  const classes = useStyles({ showWidgetToolbar });

  return (
    <Box>
      <AppBar/>
      <main>
        {
          showWidgetToolbar && (<WidgetToolbar/>)
        }
        <Box className={classes.mainContainer}>
          {children}
        </Box>
      </main>
    </Box>
  );

};


Layout.defaultProps = {
  showWidgetToolbar: false
};


const useStyles = makeStyles(
  (theme) => (
    {
      mainContainer: {
        width: "100vw",
        minHeight: (props: any) => `calc(100vh - (${kSize.APP_BAR_HEIGHT} + ${props.showWidgetToolbar ? kSize.WIDGET_TOOLBAR_HEIGHT : "0px"}))`,
      },
    }
  )
);


export default Layout;
