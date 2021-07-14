import React from "react";
import { Box } from "@material-ui/core";
import { Responsive, WidthProvider } from "react-grid-layout";


const ResponsiveGridLayout = WidthProvider(Responsive);

const WidgetCanvas: React.FC = ({ children }) => {

  // Sensible defaults
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

  return (
    <Box>
      <ResponsiveGridLayout
        className={"layouts"}
        breakpoints={breakpoints}
        cols={cols}
        draggableCancel={".noDrag"}
      >
        {children}
      </ResponsiveGridLayout>
    </Box>
  );

};


export default WidgetCanvas;
