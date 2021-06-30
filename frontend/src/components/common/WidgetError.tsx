import React from "react";
import { Box } from "@material-ui/core";


interface WidgetErrorProps {
  message: string;
  border?: string;
}


const WidgetError: React.FC<WidgetErrorProps> = ({message, border}) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      border={border}
      borderRadius={border && "borderRadius"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {message}
    </Box>
  );
};


export default WidgetError;
