import React from "react";
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import EventsWidgetBlueprint from "../components/widgets/EventsWidgetBlueprint";

import { kStore } from "../library/constants/constants";


export class EventsWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName = "Events Widget"

  public readonly queryUrl = new URL("/backend/events", kStore.BASE_URL);

  layout: Layout;

  constructor() {
    super();
    this.layout = {i: this.id, x: 0, y: 0, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6};
  }

  build(): JSX.Element {
    return (
      <div key={this.id} data-grid={this.layout}>
        <EventsWidgetBlueprint builder={this}/>
      </div>
    );
  }

}