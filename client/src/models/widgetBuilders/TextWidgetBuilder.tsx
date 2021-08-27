import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import TextWidgetBlueprint from "../../components/widgets/TextWidgetBlueprint";


export class TextWidgetBuilder extends WidgetBuilder {

  builderClassId = "text-widget";
  layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 4, h: 2, minW: 3, maxW: 8, minH: 1, maxH: 6 };

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <TextWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
