import React, { useContext } from "react";

import AppBar from "../components/AppBar";
import WidgetCanvas from "../components/WidgetCanvas";
import ChartBrowser from "../components/ChartBrowser";

import { useDrawer } from "../library/hooks/useDrawer";
import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";


const DashboardPage: React.FC = ({}) => {

  const {widgetBuilders} = useContext(WidgetBuilderContext);
  const {open, onOpen, onClose} = useDrawer();

  const openChartBrowser = () => onOpen();

  const buildAllWidgets = () => {
    return widgetBuilders.map((builder) => builder.build());
  };

  return (
    <>
      <AppBar openChartBrowser={openChartBrowser}/>
      <WidgetCanvas>
        {buildAllWidgets()}
      </WidgetCanvas>
      <ChartBrowser isOpen={open} onClose={onClose}/>
    </>
  );

};


export default DashboardPage;
