import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import EventsWidgetBlueprint from "../../components/widgets/EventsWidgetBlueprint";


export class EventsWidgetBuilder extends WidgetBuilder {

  builderClassId = "events-widget"
  layout: Layout = {i: this.widgetId, x: 0, y: Infinity, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6};

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <EventsWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
