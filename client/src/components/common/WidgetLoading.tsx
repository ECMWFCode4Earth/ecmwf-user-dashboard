import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

import WidgetContainer from "./WidgetContainer";
import WidgetTitleBar from "./WidgetTitleBar";
import WidgetBody from "./WidgetBody";


interface WidgetLoadingProps {
  title?: string;
  onClose: (e: React.MouseEvent) => void;
}


const WidgetLoading: React.FC<WidgetLoadingProps> = ({ title, onClose }) => {

  const classes = useStyles();

  return (
    <WidgetContainer>

      <WidgetTitleBar title={title || ""} onClose={onClose}/>

      <WidgetBody>
        <Box className={classes.loading}>
          <CircularProgress/>
        </Box>
      </WidgetBody>

    </WidgetContainer>
  );

};


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


export default WidgetLoading;
