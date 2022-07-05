import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import NoteWidgetBlueprint from "../../components/widgets/NoteWidgetBlueprint";


export class NoteWidgetBuilder extends WidgetBuilder {

  builderClassId = "note-widget";
  layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 10, minW: 2, maxW: 6, minH: 3, maxH: 15 };

  build(): JSX.Element {
    return (
      <div key={this.widgetId} data-grid={this.layout}>
        <NoteWidgetBlueprint builder={this}/>
      </div>
    );
  }

}
