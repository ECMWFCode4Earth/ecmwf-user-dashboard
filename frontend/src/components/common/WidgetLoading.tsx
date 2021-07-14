import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

import WidgetContainer from "./WidgetContainer";


const useStyles = makeStyles(
  (theme) => (
    {
      loading: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    }
  )
);


const WidgetLoading: React.FC = () => {

  const classes = useStyles();

  return (
    <WidgetContainer>
      <Box className={classes.loading}>
        <CircularProgress/>
      </Box>
    </WidgetContainer>
  );

};


export default WidgetLoading;
