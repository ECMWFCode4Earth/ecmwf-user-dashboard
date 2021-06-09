/**
 *
 * */

import React from "react";
import { Box } from "@material-ui/core";

import AppBar from "./components/appBar";
import WidgetCanvas from "./components/widgetCanvas";
import ServiceStatusWidget from "./components/widgets/serviceStatusWidget";


const App = () => {
  return (
    <Box width={"100vw"}>
      <AppBar/>
      <WidgetCanvas>
        <div key="a" style={{backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>Widget 1</div>
        <div key="b" >
          <ServiceStatusWidget/>
        </div>
        <div key="c" style={{border: "2px solid black", backgroundColor: "black", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
          <p style={{padding: "8px", margin: 0, color: "white"}}>{"Chart Widget - {title}"}</p>
          <iframe width="100%" height="100%" src="https://apps-dev.ecmwf.int/webapps/opencharts/embed/opencharts/medium-mslp-wind850?controls_overlay=1&player_dimension=valid_time&projection=opencharts_europe" allow="autoplay;" frameBorder="0" allowFullScreen/>
        </div>
      </WidgetCanvas>
    </Box>
  );
};


export default App;
