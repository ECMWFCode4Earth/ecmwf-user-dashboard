import { WidgetBuilder } from "./WidgetBuilder";
import { Layout } from "react-grid-layout";
import React from "react";
import ChartWidgetBlueprint from "../components/widgets/ChartWidgetBlueprint";


export class ChartWidgetBuilder extends WidgetBuilder {

  layout: ReactGridLayout.Layout;
  public readonly chartName: string;
  public readonly chartTitle: string;

  constructor(chartTitle: string, chartName: string, layout?: Layout, key?: string) {
    super(key);
    this.chartTitle = chartTitle;
    this.chartName = chartName;
    this.layout = layout || { i: this.key, x: 2, y: 0, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6 };
  }

  build(): JSX.Element {
    return (
      <div key={this.key} data-grid={this.layout}>
        <ChartWidgetBlueprint builder={this}/>
      </div>
    );
  }

}