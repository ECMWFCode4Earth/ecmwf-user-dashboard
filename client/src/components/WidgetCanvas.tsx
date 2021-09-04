import React, { useContext, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";

import { kName } from "../utils/constants";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";


const ResponsiveGridLayout = WidthProvider(Responsive);


const RGL_DEFAULT_SETTINGS = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 20,
};


const WidgetCanvas: React.FC = ({ children }) => {

  const { loadLayoutsForCurrentTab, saveLayoutsOfCurrentTab } = useContext(TabManagerContext);
  const [layouts, setLayouts] = useState(loadLayoutsForCurrentTab());


  const handleOnLayoutChange = async (layout: Layout[], layouts: Layouts) => {
    setLayouts(layouts);
    saveLayoutsOfCurrentTab(layouts);
  };


  return (
    <ResponsiveGridLayout
      measureBeforeMount={true}
      breakpoints={RGL_DEFAULT_SETTINGS.breakpoints}
      cols={RGL_DEFAULT_SETTINGS.cols}
      rowHeight={RGL_DEFAULT_SETTINGS.rowHeight}
      draggableCancel={`.${kName.CLASS_NO_DRAG}`}
      layouts={layouts}
      onLayoutChange={handleOnLayoutChange}
      style={style}
    >
      {children}
    </ResponsiveGridLayout>
  );

};


const style = {
  height: `100%`
};


export default WidgetCanvas;
