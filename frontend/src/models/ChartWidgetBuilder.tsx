import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ChartWidgetBlueprint from "../components/widgets/ChartWidgetBlueprint";


export class ChartWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName = "Chart Widget";

  public readonly chartName: string;
  public readonly chartTitle: string;

  layout: Layout;

  constructor(chartTitle: string, chartName: string) {
    super();
    this.chartTitle = chartTitle;
    this.chartName = chartName;
    this.layout = {i: this.id, x: 2, y: 0, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6};
  }

  build(): JSX.Element {
    return (
      <div key={this.id} data-grid={this.layout}>
        <ChartWidgetBlueprint builder={this}/>
      </div>
    );
  }

}