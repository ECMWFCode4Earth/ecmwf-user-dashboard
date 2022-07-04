import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ChartWidgetBlueprint from "../../components/widgets/ChartWidgetBlueprint";


export class ChartWidgetBuilder extends WidgetBuilder {

  builderClassId = "iframe-widget"
  layout: Layout = {i: this.widgetId, x: 0, y: Infinity, w: 4, h: 10, minW: 2, maxW: 8, minH: 5, maxH: 20};

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <ChartWidgetBlueprint builder={this} title={this.title} src={this.href} appURL={this.appURL}/>
      </div>
    );
  }

}
