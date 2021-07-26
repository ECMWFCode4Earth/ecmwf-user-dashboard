import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import SatelliteAlertsWidgetBlueprint from "../components/widgets/SatelliteAlertsWidgetBlueprint";



export class SatelliteAlertsWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName = "Satellite Alerts Widget"

  layout: Layout;

  constructor() {
    super();
    this.layout = { i: this.id, x: 0, y: 0, w: 3, h: 2, minW: 3, maxW: 4, minH: 1, maxH: 3 };
  }

  public build() {
    return (
      <div key={this.id} data-grid={this.layout}>
        <SatelliteAlertsWidgetBlueprint builder={this}/>
      </div>
    );
  }

}

