import React, { useContext, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";

import { kName } from "../utils/constants/store";
import localStore from "../utils/localStore";
import { GlobalContext } from "../utils/contexts/GlobalContext";


const ResponsiveGridLayout = WidthProvider(Responsive);


const style = {
  height: `calc( 100vh )` // TODO Change later
};


const RGL_DEFAULT_SETTINGS = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 20,
};


const WidgetCanvas: React.FC = ({ children }) => {

  const { globalConfiguration } = useContext(GlobalContext);
  const { tabDetails } = globalConfiguration;
  const [layouts, setLayouts] = useState({});

  useEffect(() => {
    fetchLayouts().catch((err) => console.log(err));
  }, []);

  const fetchLayouts = async () => {
    const layouts = await localStore.getItem(`layouts-tab-${tabDetails.activeTab}`);
    if (layouts === null) {
      await localStore.setItem(`layouts-tab-${tabDetails.activeTab}`, {});
      return;
    }
    console.log(layouts);
    setLayouts(layouts as Layouts);
  };

  const handleOnLayoutChange = async (layout: Layout[], layouts: Layouts) => {
    setLayouts(layouts);
    await localStore.setItem(`layouts-tab-${tabDetails.activeTab}`, layouts);
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


export default WidgetCanvas;
