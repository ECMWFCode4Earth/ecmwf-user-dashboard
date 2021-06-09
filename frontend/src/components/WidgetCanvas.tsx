/**
 * Widget Canvas
 * - Widgets resides here.
 * - Use React-Grid-Layout (https://github.com/react-grid-layout/react-grid-layout)
 * */

import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Responsive, WidthProvider } from "react-grid-layout";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {}
    }
  )
);


const ResponsiveGridLayout = WidthProvider(Responsive);


interface WidgetCanvas {

}


const WidgetCanvas: React.FC<WidgetCanvas> = ({ children }) => {

  const classes = useStyles();

  // TODO move constants
  return (
    <Box className={classes.root}>
      <ResponsiveGridLayout
        className="layouts"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {children}
      </ResponsiveGridLayout>
    </Box>
  );

};


export default WidgetCanvas;
