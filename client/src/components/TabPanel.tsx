import React from "react";
import { Box } from "@material-ui/core";


interface TabPanelProps {
  index: number;
  value: number;
}


const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <Box p={1} hidden={value !== index}>
      {
        value === index && (<>{children}</>)
      }
    </Box>
  );
};


export default TabPanel;
