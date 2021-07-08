import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ServiceStatusWidgetBlueprint from "../components/widgets/ServiceStatusWidgetBlueprint";

import { kStore } from "../library/constants/constants";


export class ServiceStatusWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName = "Service Status Widget"

  public readonly queryUrl: URL = new URL("/backend/service_status", kStore.BASE_URL);
  public readonly referenceUrl: URL = new URL("https://www.ecmwf.int/en/service-status");

  layout: Layout;

  constructor() {
    super();
    this.layout = { i: this.id, x: 0, y: 0, w: 3, h: 2, minW: 3, maxW: 4, minH: 1, maxH: 3 };
  }

  public build() {
    return (
      <div key={this.id} data-grid={this.layout}>
        <ServiceStatusWidgetBlueprint builder={this}/>
      </div>
    );
  }

}

