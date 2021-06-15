/**
 * Dashboard
 * - User can add widgets
 * - User can customise dashboards
 * */

import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import AppBar from "../components/AppBar";
import WidgetCanvas from "../components/WidgetCanvas";

import { ServiceStatusWidgetBuilder } from "../models/ServiceStatusWidgetBuilder";
import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";
import ChartsBrowser from "../components/ChartsBrowser";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface DashboardPage {

}


const DashboardPage: React.FC<DashboardPage> = ({}) => {

  const classes = useStyles();
  const {widgetBuilders, setWidgetBuilders} = useContext(WidgetBuilderContext);

  // TODO Remove this useEffect block
  useEffect(() => {
    setWidgetBuilders([...widgetBuilders, new ServiceStatusWidgetBuilder()])
  }, [])

  const buildAllWidgets = () => {
    return widgetBuilders.map((builder) => builder.build());
  };

  return (
    <>
      <AppBar/>
      <WidgetCanvas>
        {buildAllWidgets()}
      </WidgetCanvas>
      <ChartsBrowser />
    </>
  );

};


export default DashboardPage;
