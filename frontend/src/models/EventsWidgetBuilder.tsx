/**
 *
 * */

import React from "react";
import ReactGridLayout from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";
import EventsWidgetBlueprint from "../components/widgets/EventsWidgetBlueprint";
import { kStore } from "../library/constants/constants";


export class EventsWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName = "Events Widget"
  public readonly QUERY_URL = new URL("/backend/events", kStore.BASE_URL);

  layout: ReactGridLayout.Layout;

  constructor(layout?: ReactGridLayout.Layout, key?: string) {
    super(key);
    this.layout = layout || {i: this.key, x: 2, y: 0, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6};
  }

  build(): JSX.Element {
    return (
      <div key={this.key} data-grid={this.layout}>
        <EventsWidgetBlueprint builder={this}/>
      </div>
    );
  }

}