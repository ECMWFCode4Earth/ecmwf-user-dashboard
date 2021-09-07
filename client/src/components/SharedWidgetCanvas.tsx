import React from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";

import { kName } from "../utils/constants";


const ResponsiveGridLayout = WidthProvider(Responsive);


const RGL_DEFAULT_SETTINGS = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 20,
};


interface SharedWidgetCanvasProps {
  layouts: Layouts
}


const SharedWidgetCanvas: React.FC<SharedWidgetCanvasProps> = ({ children, layouts }) => {

  return (
    <ResponsiveGridLayout
      measureBeforeMount={true}
      breakpoints={RGL_DEFAULT_SETTINGS.breakpoints}
      cols={RGL_DEFAULT_SETTINGS.cols}
      rowHeight={RGL_DEFAULT_SETTINGS.rowHeight}
      draggableCancel={`.${kName.CLASS_NO_DRAG}`}
      layouts={layouts}
      isDraggable={false}
      isResizable={false}
      style={style}
    >
      {children}
    </ResponsiveGridLayout>
  );

};


const style = {
  height: `100%`
};


export default SharedWidgetCanvas;
