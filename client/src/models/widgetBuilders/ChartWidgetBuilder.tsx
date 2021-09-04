import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ChartWidgetBlueprint from "../../components/widgets/ChartWidgetBlueprint";


export class ChartWidgetBuilder extends WidgetBuilder {

  builderClassId = "chart-widget"
  layout: Layout = {i: this.widgetId, x: 0, y: Infinity, w: 3, h: 6, minW: 2, maxW: 4, minH: 5, maxH: 10};

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <ChartWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
