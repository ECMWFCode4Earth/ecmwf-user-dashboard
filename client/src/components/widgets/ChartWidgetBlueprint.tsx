import React, { useContext, useEffect, useState } from "react";
import {IconButton, makeStyles} from "@material-ui/core";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { ChartWidgetBuilder } from "../../models/widgetBuilders/ChartWidgetBuilder";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


export interface ChartWidgetConfiguration {
  widgetTitle: string;
}

// TODO: change intial state to the title if it is being passed
interface ChartWidgetBlueprintProps {
  builder: ChartWidgetBuilder;
  title: string;
  src: string;
  appURL: string;
}


const ChartWidgetBlueprint: React.FC<ChartWidgetBlueprintProps> = ({ builder , title, src, appURL}) => {

  const classes = useStyles();
  const { removeWidgetFromCurrentTab, loadWidgetConfiguration } = useContext(TabManagerContext);
  const [chartName, setChartName] = useState("");


  useEffect(() => {
    console.log("widgetConfiguration: ", loadWidgetConfiguration(builder.widgetId))
    const chartWidgetConfiguration = loadWidgetConfiguration(builder.widgetId) as ChartWidgetConfiguration;
    if (chartWidgetConfiguration) {
      setChartName(chartWidgetConfiguration.widgetTitle);
    }
  }, []);


  const chartSrc = src;

  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

  return (
    <WidgetContainer>

      <WidgetTitleBar title={title} onClose={removeWidget}>
        <IconButton href={appURL} target={"_blank"} color={"inherit"} size={"small"}>
          <ExitToAppIcon fontSize={"small"}/>
        </IconButton>
      </WidgetTitleBar>

      <WidgetBody>
        {
          chartName && (
            <iframe
              width={"100%"}
              height={"100%"}
              src={appURL}
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
