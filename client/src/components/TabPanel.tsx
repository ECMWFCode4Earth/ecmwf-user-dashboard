import React from "react";
import { Box } from "@material-ui/core";


interface TabPanelProps {
  index: any;
  value: any;
}


const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div hidden={value !== index}>
      {
        value === index && (
          <Box p={1}>
            {children}
          </Box>
        )
      }
    </div>
  );
};


export default TabPanel;
