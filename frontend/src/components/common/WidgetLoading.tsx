/**
 * WidgetLoading component
 * */

import React from "react";
import { Box } from "@material-ui/core";


interface WidgetLoading {
  border?: string;
}


const WidgetLoading: React.FC<WidgetLoading> = ({ border }) => {
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
      Loading...
    </Box>
  );

};


export default WidgetLoading;
