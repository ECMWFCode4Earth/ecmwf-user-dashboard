/**
 * Dashboard
 * - User can add widgets
 * - User can customise dashboards
 * */

import React from "react";
import { makeStyles } from "@material-ui/core";

import AppBar from "../components/appBar";
import WidgetCanvas from "../components/widgetCanvas";

import ServiceStatusWidget from "../components/widgets/serviceStatusWidget";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface DashboardPageProps {

}


const DashboardPage: React.FC<DashboardPageProps> = ({}) => {

  const classes = useStyles();

  return (
    <>
      <AppBar/>
      <WidgetCanvas>
        <div key="b">
          <ServiceStatusWidget/>
        </div>
      </WidgetCanvas>
    </>
  );

};


export default DashboardPage;
