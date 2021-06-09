/**
 * Service Status Widget Class
 * - Displays information from https://www.ecmwf.int/en/service-status
 * */

import React from "react";

import { IWidget } from "./IWidget";
import ServiceStatusWidgetBody from "../components/widgets/ServiceStatusWidgetBody";


export class ServiceStatusWidget implements IWidget {

  build() {
    return (
      <div>
        <ServiceStatusWidgetBody widget={this}/>
      </div>
    );
  }

}

