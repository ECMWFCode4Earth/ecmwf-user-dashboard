import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ChartWidgetBlueprint from "../../components/widgets/ChartWidgetBlueprint";


export class ChartWidgetBuilder extends WidgetBuilder {

  builderClassId = "chart-widget"
  layout: Layout = {i: this.widgetId, x: 0, y: Infinity, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6};

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <ChartWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
