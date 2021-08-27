import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import WebAPIActivityWidgetBlueprint from "../../components/widgets/WebAPIActivityWidgetBlueprint";


export class WebAPIActivityWidgetBuilder extends WidgetBuilder {

  builderClassId = "web-api-activity-widget"
  layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 2, minW: 3, maxW: 4, minH: 1, maxH: 3 };

  public build() {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <WebAPIActivityWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
