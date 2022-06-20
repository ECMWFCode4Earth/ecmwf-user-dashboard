import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";

import { ChartWidgetBuilder } from "../../models/widgetBuilders/ChartWidgetBuilder";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import {WidgetBuilder} from "../../models/widgetBuilders/WidgetBuilder";


export interface GenericWidgetConfiguration {
    widgetName: string;
    widgetType: string;
    widgetTitle: string;
    widgetHref: string;
    widgetAppURL: string;
}
//
//
// interface GenericWidgetBuilderProps {
//     builder: WidgetBuilder;
// }


// const GenericWidgetBlueprint: React.FC<GenericWidgetBuilderProps> = ({ builder }) => {
//
//     const classes = useStyles();
//     const { removeWidgetFromCurrentTab, loadWidgetConfiguration } = useContext(TabManagerContext);
//     const [widgetName, setWidgetName] = useState("");
//
//     let widgetConfiguration: GenericWidgetConfiguration = {widgetName: 'Name', widgetType: 'Type', widgetTitle: 'Title', widgetHref: 'href', widgetAppURL: 'URL'};
//     useEffect(() => {
//         widgetConfiguration = loadWidgetConfiguration(builder.widgetId) as GenericWidgetConfiguration;
//         if (widgetConfiguration) {
//             setWidgetName(widgetConfiguration.widgetName);
//         }
//     }, []);
//
//
//     const widgetSrc = widgetConfiguration.widgetHref;
//
//     const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);
//
//     return (
//         <WidgetContainer>
//
//             <WidgetTitleBar title={widgetName} onClose={removeWidget}/>
//
//             <WidgetBody>
//                 {
//                     widgetName && (
//                         <h1>Hello World</h1>
//                     )
//                 }
//             </WidgetBody>
//
//         </WidgetContainer>
//     );
//
// };
//
//
// const useStyles = makeStyles(
//     (theme) => (
//         {}
//     )
// );
//
//
// export default GenericWidgetBlueprint;
