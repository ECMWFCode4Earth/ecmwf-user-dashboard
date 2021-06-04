/**
 *
 * */

import React from "react";
import { Box } from "@material-ui/core";

import AppBar from "./components/appBar";
import WidgetCanvas from "./components/widgetCanvas";


const App = () => {
  return (
    <Box width={"100vw"}>
      <AppBar/>
      <WidgetCanvas />
    </Box>
  );
};


export default App;
