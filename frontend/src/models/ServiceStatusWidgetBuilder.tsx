/**
 * Service Status Widget Builder Class
 * - Builds Service Status Widget
 * - Built widget displays information from https://www.ecmwf.int/en/service-status
 * */

import React from "react";

import { IWidgetBuilder } from "./IWidgetBuilder";
import ServiceStatusWidgetBlueprint from "../components/widgets/ServiceStatusWidgetBlueprint";


export class ServiceStatusWidgetBuilder implements IWidgetBuilder {

  build() {
    return (
      <div key={"b"} data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>
        <ServiceStatusWidgetBlueprint builder={this}/>
      </div>
    );
  }

}

