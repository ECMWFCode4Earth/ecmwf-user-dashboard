/**
 * Service Status Widget Builder Class
 * - Builds Service Status Widget
 * - Built widget displays information from https://www.ecmwf.int/en/service-status
 * */

import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";
import ServiceStatusWidgetBlueprint from "../components/widgets/ServiceStatusWidgetBlueprint";

import { kStore } from "../library/constants/constants";


export class ServiceStatusWidgetBuilder extends WidgetBuilder {

  public readonly QUERY_URL: URL = new URL("/backend/service_status", kStore.BASE_URL);
  public readonly REFERENCE_URL: URL = new URL("https://www.ecmwf.int/en/service-status");

  public layout: Layout;

  constructor(layout?: Layout, key?: string) {
    super(key);
    this.layout = layout || { i: this.key, x: 0, y: 0, w: 3, h: 2, minW: 3, maxW: 4, minH: 1, maxH: 3 };
  }

  public build() {
    return (
      <div key={this.key} data-grid={this.layout}>
        <ServiceStatusWidgetBlueprint builder={this}/>
      </div>
    );
  }

}

