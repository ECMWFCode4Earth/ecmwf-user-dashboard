import { TextWidgetBuilder } from "../models/widgetBuilders/TextWidgetBuilder";
import { ChartWidgetBuilder } from "../models/widgetBuilders/ChartWidgetBuilder";
import { EventsWidgetBuilder } from "../models/widgetBuilders/EventsWidgetBuilder";
import { MARSActivityWidgetBuilder } from "../models/widgetBuilders/MARSActivityWidgetBuilder";
import { SatelliteAlertsWidgetBuilder } from "../models/widgetBuilders/SatelliteAlertsWidgetBuilder";
import { ServiceStatusWidgetBuilder } from "../models/widgetBuilders/ServiceStatusWidgetBuilder";
import { WebAPIActivityWidgetBuilder } from "../models/widgetBuilders/WebAPIActivityWidgetBuilder";


export const builderClassIdToBuilderClassMap = {
  "text-widget": {
    name: "Text Widget",
    builderClass: TextWidgetBuilder
  },
  "chart-widget": {
    name: "Chart Widget",
    builderClass: ChartWidgetBuilder
  },
  "events-widget": {
    name: "Events Widget",
    builderClass: EventsWidgetBuilder
  },
  "mars-activity-widget": {
    name: "MARS Activity Widget",
    builderClass: MARSActivityWidgetBuilder
  },
  "satellite-alerts-widget": {
    name: "Satellite Alerts Widget",
    builderClass: SatelliteAlertsWidgetBuilder
  },
  "service-status-widget": {
    name: "Service Status Widget",
    builderClass: ServiceStatusWidgetBuilder
  },
  "web-api-activity-widget": {
    name: "Web API Widget",
    builderClass: WebAPIActivityWidgetBuilder
  },
};
