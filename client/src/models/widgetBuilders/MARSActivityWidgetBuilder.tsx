import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import MARSActivityWidgetBlueprint from "../../components/widgets/MARSActivityWidgetBlueprint";


export class MARSActivityWidgetBuilder extends WidgetBuilder {

  builderClassId = "mars-activity-widget";
  layout: Layout = { i: this.uuid, x: 0, y: Infinity, w: 3, h: 10, minW: 3, maxW: 4, minH: 8, maxH: 11 };

  public build() {
    return (
      <div key={this.uuid} data-grid={this.layout}>
        <MARSActivityWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
