import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

import WidgetContainer from "./WidgetContainer";
import WidgetTitleBar from "./WidgetTitleBar";
import WidgetBody from "./WidgetBody";


interface WidgetErrorProps {
  title?: string;
  message: string;
  onClose: (e: React.MouseEvent) => void;
}


const WidgetError: React.FC<WidgetErrorProps> = ({ title, message, onClose }) => {

  const classes = useStyles();

  return (
    <WidgetContainer>

      <WidgetTitleBar title={title || ""} onClose={onClose}/>

      <WidgetBody>
        <Box px={2} color={"error.dark"} className={classes.container}>
          <Typography align={"center"} variant={"body2"}>{message}</Typography>
        </Box>
      </WidgetBody>

    </WidgetContainer>
  );

};


WidgetError.defaultProps = {
  title: "",
};


const useStyles = makeStyles(
  (theme) => (
    {
      container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }
    }
  )
);


export default WidgetError;
