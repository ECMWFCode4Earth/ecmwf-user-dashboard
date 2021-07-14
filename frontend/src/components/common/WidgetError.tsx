import React from "react";
import { Box } from "@material-ui/core";
import { kBorder } from "../../library/constants/constants";


interface WidgetErrorProps {
  message: string;
  border?: boolean;
}


const WidgetError: React.FC<WidgetErrorProps> = ({message, border}) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      border={border && kBorder.WIDGET_BORDER}
      borderRadius={border && "borderRadius"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {message}
    </Box>
  );
};


WidgetError.defaultProps = {
  border: true,
}


export default WidgetError;
