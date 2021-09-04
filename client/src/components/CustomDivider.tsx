import React from "react";
import { Box, Divider } from "@material-ui/core";


interface CustomDividerProps {
  my: number;
}


const CustomDivider: React.FC<CustomDividerProps> = ({ my }) => {
  return (
    <Box my={my}>
      <Divider/>
    </Box>
  );
};


export default CustomDivider
