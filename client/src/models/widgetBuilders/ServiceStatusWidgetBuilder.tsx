import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import ServiceStatusWidgetBlueprint from "../../components/widgets/ServiceStatusWidgetBlueprint";


export class ServiceStatusWidgetBuilder extends WidgetBuilder {

  builderClassId = "service-status-widget"
  layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 6, minW: 2, maxW: 4, minH: 5, maxH: 10 };

  public build() {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <ServiceStatusWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
