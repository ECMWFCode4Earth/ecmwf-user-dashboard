import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

// import NoteWidgetBlueprint from "../../components/widgets/NoteWidgetBlueprint";
import TextWidgetBlueprint from "../../components/widgets/TextWidgetBlueprint";


export class TextWidgetBuilder extends WidgetBuilder {

    builderClassId = "text-widget";
    layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 10, minW: 2, maxW: 6, minH: 3, maxH: 15 };

    build(): JSX.Element {
        return (
            <div key={this.widgetId} data-grid={this.layout}>
                <TextWidgetBlueprint builder={this} title={this.title} src={this.href} appURL={this.appURL} authRequired={this.authRequired}/>
            </div>
        );
    }

}
