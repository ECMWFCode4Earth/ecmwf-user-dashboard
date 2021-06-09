/**
 *
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


interface WidgetCanvasProps {

}


const WidgetCanvas: React.FC<WidgetCanvasProps> = ({children}) => {

  const classes = useStyles();
  const layouts = {
    lg: [
    { i: "a", x: 0, y: 0, w: 2, h: 2 },
    { i: "b", x: 2, y: 0, w: 3, h: 2, minW: 3, maxW: 4 },
    { i: "c", x: 5, y: 0, w: 5, h: 3 }
  ]
  };

  return (
    <>
      <Box className={classes.root}>
        <ResponsiveGridLayout
          className="layouts"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {children}
        </ResponsiveGridLayout>
      </Box>
    </>
  );

};


export default WidgetCanvas;
