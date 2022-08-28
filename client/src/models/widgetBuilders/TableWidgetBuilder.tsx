// export {}
import { Layout } from "react-grid-layout";

import { WidgetBuilder } from "./WidgetBuilder";

import SatelliteAlertsWidgetBlueprint from "../../components/widgets/SatelliteAlertsWidgetBlueprint";
import TableWidgetBlueprint from "../../components/widgets/TableWidgetBlueprint";


export class TableWidgetBuilder extends WidgetBuilder {

    builderClassId = "table-widget"
    layout: Layout = { i: this.widgetId, x: 0, y: Infinity, w: 3, h: 12, minW: 3, maxW: 4, minH: 7, maxH: 15 };

    public build() {
        console.log("token from builder:", this.token)
        return (
            <div key={this.widgetId} data-grid={this.layout} /*style={{"backgroundColor":"black"}}*/>
                <TableWidgetBlueprint builder={this} title={this.title} src={this.href} appURL={this.appURL} authRequired={this.authRequired} token={this.token}/>
            </div>
        );
    }

}