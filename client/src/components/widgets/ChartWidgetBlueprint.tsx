import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { ChartWidgetBuilder } from "../../models/widgetBuilders/ChartWidgetBuilder";

import { WidgetBuilderContext } from "../../utils/contexts/WidgetBuilderContext";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface ChartWidgetBlueprintProps {
  builder: ChartWidgetBuilder;
}


const ChartWidgetBlueprint: React.FC<ChartWidgetBlueprintProps> = ({builder}) => {

  const classes = useStyles();
  const [chartName, setChartName] = useState(builder.chartName);

  const {removeWidgetBuilder} = useContext(WidgetBuilderContext);

  const removeWidget = () => removeWidgetBuilder(builder);

  return (
    <WidgetContainer>

      <WidgetTitleBar title={builder.chartTitle} onClose={removeWidget}/>

      <WidgetBody>
        <iframe
          width="100%"
          height="100%"
          src={`https://apps-dev.ecmwf.int/webapps/opencharts/embed/opencharts/${chartName}?controls_overlay=1&player_dimension=valid_time&projection=opencharts_europe`}
          allow="autoplay;"
          frameBorder="0"
          allowFullScreen
        />
      </WidgetBody>

    </WidgetContainer>
  );

};


export default ChartWidgetBlueprint;
