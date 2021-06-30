import React from "react";
import { Box, CircularProgress } from "@material-ui/core";


interface WidgetLoadingProps {
  border?: string;
}


const WidgetLoading: React.FC<WidgetLoadingProps> = ({ border }) => {
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
      <CircularProgress />
    </Box>
  );

};


export default WidgetLoading;
