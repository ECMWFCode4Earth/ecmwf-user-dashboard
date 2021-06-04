/**
 *
 * */

import React from "react";
import { Box, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {

      }
    }
  )
);


interface WidgetCanvasProps {

}


const WidgetCanvas = ({}: WidgetCanvasProps) => {

  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>

      </Box>
    </>
  );

};


export default WidgetCanvas;
