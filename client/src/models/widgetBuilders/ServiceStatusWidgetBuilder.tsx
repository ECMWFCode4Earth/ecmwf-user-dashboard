import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ServiceStatusWidgetBlueprint from "../../components/widgets/ServiceStatusWidgetBlueprint";


export class ServiceStatusWidgetBuilder extends WidgetBuilder {

  builderClassId = "service-status-widget"
  layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 12, minW: 3, maxW: 4, minH: 7, maxH: 15 };

  public build() {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <ServiceStatusWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
