/**
 * Dashboard
 * - User can add widgets
 * - User can customise dashboards
 * */

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";

import AppBar from "../components/AppBar";
import WidgetCanvas from "../components/WidgetCanvas";
import ChartBrowser from "../components/ChartBrowser";

import { useDrawer } from "../library/hooks/useDrawer";
import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface DashboardPageProps {

}


const DashboardPage: React.FC<DashboardPageProps> = ({}) => {

  const classes = useStyles();
  const {widgetBuilders, setWidgetBuilders} = useContext(WidgetBuilderContext);
  const {open, onOpen, onClose} = useDrawer();

  const openChartBrowser = () => {
    onOpen();
  };

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
