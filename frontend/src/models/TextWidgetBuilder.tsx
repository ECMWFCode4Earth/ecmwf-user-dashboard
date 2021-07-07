/**
 * Text Widget Builder
 * */
import React from "react";
import ReactGridLayout from "react-grid-layout";

import TextWidgetBlueprint from "../components/widgets/TextWidgetBlueprint";

import { WidgetBuilder } from "./WidgetBuilder";


export class TextWidgetBuilder extends WidgetBuilder {

  public static readonly widgetName  = "Text Widget"
  layout: ReactGridLayout.Layout;

  constructor(layout?: ReactGridLayout.Layout, key?: string) {
    super(key);
    this.layout = layout || {i: this.key, x: 2, y: 0, w: 4, h: 2, minW: 3, maxW: 6, minH: 2, maxH: 6};
  }

  build(): JSX.Element {
    return (
      <div key={this.key} data-grid={this.layout}>
        <TextWidgetBlueprint builder={this}/>
      </div>
    );
  }

}