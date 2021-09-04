import { TextWidgetBuilder } from "../models/widgetBuilders/TextWidgetBuilder";
import { ChartWidgetBuilder } from "../models/widgetBuilders/ChartWidgetBuilder";
import { EventsWidgetBuilder } from "../models/widgetBuilders/EventsWidgetBuilder";
import { MARSActivityWidgetBuilder } from "../models/widgetBuilders/MARSActivityWidgetBuilder";
import { SatelliteAlertsWidgetBuilder } from "../models/widgetBuilders/SatelliteAlertsWidgetBuilder";
import { ServiceStatusWidgetBuilder } from "../models/widgetBuilders/ServiceStatusWidgetBuilder";
import { WebAPIActivityWidgetBuilder } from "../models/widgetBuilders/WebAPIActivityWidgetBuilder";


/**
 * Describe your widget here.
 *
 * format: {
 *   name: string,
 *   BuilderClass: Class
 * }
 * */
export const builderClassIdToBuilderClassMap = {
  "text-widget": {
    name: "Text Widget",
    BuilderClass: TextWidgetBuilder
  },
  // "chart-widget": {
  //   name: "Chart Widget",
  //   BuilderClass: ChartWidgetBuilder
  // },
  // "events-widget": {
  //   name: "Events Widget",
  //   BuilderClass: EventsWidgetBuilder
  // },
  // "mars-activity-widget": {
  //   name: "MARS Activity Widget",
  //   BuilderClass: MARSActivityWidgetBuilder
  // },
  // "satellite-alerts-widget": {
  //   name: "Satellite Alerts Widget",
  //   BuilderClass: SatelliteAlertsWidgetBuilder
  // },
  // "service-status-widget": {
  //   name: "Service Status Widget",
  //   BuilderClass: ServiceStatusWidgetBuilder
  // },
  // "web-api-activity-widget": {
  //   name: "Web API Widget",
  //   BuilderClass: WebAPIActivityWidgetBuilder
  // },
};
