import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { ChartWidgetBuilder } from "../../models/widgetBuilders/ChartWidgetBuilder";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";


export interface ChartWidgetConfiguration {
  chartName: string;
}


interface ChartWidgetBlueprintProps {
  builder: ChartWidgetBuilder;
}


const ChartWidgetBlueprint: React.FC<ChartWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const { removeWidgetFromCurrentTab, loadWidgetConfiguration } = useContext(TabManagerContext);
  const [chartName, setChartName] = useState("");


  useEffect(() => {
    const chartWidgetConfiguration = loadWidgetConfiguration(builder.widgetId) as ChartWidgetConfiguration;
    if (chartWidgetConfiguration) {
      setChartName(chartWidgetConfiguration.chartName);
    }
  }, []);


  const chartSrc = `https://apps-dev.ecmwf.int/webapps/opencharts/embed/opencharts/${chartName}?controls_overlay=1&player_dimension=valid_time&projection=opencharts_europe`;

  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

  return (
    <WidgetContainer>

      <WidgetTitleBar title={chartName} onClose={removeWidget}/>

      <WidgetBody>
        {
          chartName && (
            <iframe
              width={"100%"}
              height={"100%"}
              src={chartSrc}
              allow={"autoplay"}
              frameBorder={"0"}
              allowFullScreen
            />
          )
        }
      </WidgetBody>

    </WidgetContainer>
  );

};


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


export default ChartWidgetBlueprint;
