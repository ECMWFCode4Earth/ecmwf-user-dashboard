/**
 *
 * */

import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import { ChartWidgetBuilder } from "../../models/ChartWidgetBuilder";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface ChartWidgetBlueprint {
  builder: ChartWidgetBuilder;
}


const ChartWidgetBlueprint: React.FC<ChartWidgetBlueprint> = ({ builder }) => {

  const classes = useStyles();

  return (
    <>
      <Box style={{
        border: "2px solid black",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
      }}>
        <p style={{ padding: "8px", margin: 0, color: "white" }}>{builder.chartTitle}</p>
        <iframe
          width="100%"
          height="100%"
          src={`https://apps-dev.ecmwf.int/webapps/opencharts/embed/opencharts/${builder.chartName}?controls_overlay=1&player_dimension=valid_time&projection=opencharts_europe`}
          allow="autoplay;"
          frameBorder="0"
          allowFullScreen
        />
      </Box>
    </>
  );

};


export default ChartWidgetBlueprint;
