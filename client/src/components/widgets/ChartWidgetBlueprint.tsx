import React, { useContext, useEffect, useState } from "react";
import {IconButton, makeStyles} from "@material-ui/core";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { ChartWidgetBuilder } from "../../models/widgetBuilders/ChartWidgetBuilder";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import {log} from "util";


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
  const [chartSrc, setChartSrc] = useState(""); 

  useEffect(() => {
    console.log("widgetConfiguration: ", loadWidgetConfiguration(builder.widgetId))
    const chartWidgetConfiguration = loadWidgetConfiguration(builder.widgetId) as ChartWidgetConfiguration;
    if (chartWidgetConfiguration) {
      setChartName(chartWidgetConfiguration.widgetTitle);
    }
    const getSrc = async () => {
      console.log("src: ", src)
      await  axios.get(src).then(data => {
            console.log("data from src: ", data)
            setChartSrc(data.data.data.src);
          }
      ).catch(err => console.log(err))
    }
    getSrc()
  }, []);


  // useEffect(() => {
  //   return () => {
  //     const getSrc = async () => {
  //       console.log("src: ", src)
  //       await  axios.get(src).then(data => {
  //             console.log("data from src: ", data)
  //             // setChartSrc(data.data.data.src);
  //           }
  //       )
  //     }
  //     getSrc().catch(err => console.log(err))
  //   };
  // }, []);

  console.log("chartSrc: ", chartSrc)


  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

  // @ts-ignore
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
              src={chartSrc}
              allow={"autoplay"}
              frameBorder={"0"}
              allowFullScreen
              sandbox="allow-scripts allow-same-origin"
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
