import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import EventsWidgetBlueprint from "../../components/widgets/EventsWidgetBlueprint";


export class EventsWidgetBuilder extends WidgetBuilder {

  builderClassId = "events-widget"
  layout: Layout = {i: this.widgetId, x: 0, y: Infinity, w: 3, h: 6, minW: 2, maxW: 4, minH: 5, maxH: 10};

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <EventsWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
