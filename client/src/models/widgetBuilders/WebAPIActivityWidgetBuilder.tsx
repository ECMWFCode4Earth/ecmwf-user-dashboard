import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import WebAPIActivityWidgetBlueprint from "../../components/widgets/WebAPIActivityWidgetBlueprint";


export class WebAPIActivityWidgetBuilder extends WidgetBuilder {

  builderClassId = "web-api-activity-widget"
  layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 10, minW: 3, maxW: 4, minH: 8, maxH: 12 };

  public build() {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <WebAPIActivityWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
