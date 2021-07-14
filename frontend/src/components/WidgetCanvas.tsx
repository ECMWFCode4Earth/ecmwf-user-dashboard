import React from "react";
import { Box } from "@material-ui/core";
import { Responsive, WidthProvider } from "react-grid-layout";
import { kDefaults, kName } from "../library/constants/constants";


const ResponsiveGridLayout = WidthProvider(Responsive);


const WidgetCanvas: React.FC = ({ children }) => {
  return (
    <Box>
      <ResponsiveGridLayout
        breakpoints={kDefaults.RGL_BREAKPOINTS}
        cols={kDefaults.RGL_COLS}
        draggableCancel={`.${kName.CLASS_NO_DRAG}`}
      >
        {children}
      </ResponsiveGridLayout>
    </Box>
  );
};


export default WidgetCanvas;
