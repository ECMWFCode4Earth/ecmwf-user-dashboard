import React from "react";
import ReactGridLayout from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";
import APIKeyWidgetBlueprint from "../components/widgets/APIKeyWidgetBlueprint";


export class APIKeyWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName = "API Key Widget";
  layout: ReactGridLayout.Layout;

  constructor(layout?: ReactGridLayout.Layout, key?: string) {
    super(key);
    this.layout = layout || {i: this.key, x: 0, y: 0, w: 3, h: 1, minW: 2, maxW: 3, minH: 1, maxH: 1};
  }

  build(): JSX.Element {
    return (
      <div key={this.key} data-grid={this.layout}>
        <APIKeyWidgetBlueprint builder={this}/>
      </div>
    );
  }

}