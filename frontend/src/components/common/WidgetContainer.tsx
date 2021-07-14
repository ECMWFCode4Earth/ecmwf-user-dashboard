import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import { kBorder } from "../../library/constants/constants";


const useStyles = makeStyles(
  (theme) => (
    {
      container: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
        border: kBorder.WIDGET_BORDER,
        borderRadius: theme.shape.borderRadius,
      }
    }
  )
);


const WidgetContainer: React.FC = ({ children }) => {

  const classes = useStyles();

  return (
    <Box boxShadow={2} className={classes.container}>
      {children}
    </Box>
  );

};


export default WidgetContainer;
