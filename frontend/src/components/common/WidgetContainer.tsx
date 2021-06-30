import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { kBorder } from "../../library/constants/constants";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        height: "100%",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
        border: kBorder.WIDGET_BORDER,
        borderRadius: theme.shape.borderRadius,
      }
    }
  )
);


interface WidgetContainerProps {

}


const WidgetContainer: React.FC<WidgetContainerProps> = ({children}) => {

  const classes = useStyles();

  return (
    <Box className={classes.root} boxShadow={2}>
      {children}
    </Box>
  );

};


export default WidgetContainer;
