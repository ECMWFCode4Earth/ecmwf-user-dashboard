import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import WidgetContainer from "./WidgetContainer";
import WidgetTitleBar from "./WidgetTitleBar";
import WidgetBody from "./WidgetBody";


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


interface WidgetErrorProps {
  message: string;
  onClose: (e: React.MouseEvent) => void;
}


const WidgetError: React.FC<WidgetErrorProps> = ({ message, onClose }) => {

  const classes = useStyles();

  return (
    <WidgetContainer>

      <WidgetTitleBar title={"Error"} onClose={onClose}/>

      <WidgetBody>
        <Box className={classes.container}>
          <Typography variant={"body2"}>{message}</Typography>
        </Box>
      </WidgetBody>

    </WidgetContainer>
  );

};


export default WidgetError;
