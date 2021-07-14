import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { kBorder } from "../../library/constants/constants";


interface WidgetLoadingProps {
  border?: boolean;
}


const WidgetLoading: React.FC<WidgetLoadingProps> = ({ border }) => {
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
      <CircularProgress />
    </Box>
  );

};


WidgetLoading.defaultProps = {
  border: true,
}


export default WidgetLoading;
