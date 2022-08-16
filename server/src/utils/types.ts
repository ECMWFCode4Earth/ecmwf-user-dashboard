import { Layouts } from "react-grid-layout";


export interface TabManager {
  tabCount: number;
  activeTab: number;
  lastSavedTimestamp: Date | string;
  tabs: Tab[];
}

export interface GenericWidgetConfiguration {
  widgetName: string;
  widgetType: string;
  widgetTitle: string;
  widgetHref: string;
  widgetAppURL: string;
  authRequired: boolean;
}


export interface Tab {
  uuid: string;
  name: string;
  shared: boolean;
  sharedWithUsers: string[];
  widgetIds: string[]; // Widget Ids contain useful information separated by "/". (builderClassId/uuid)
  layouts: Layouts
  widgetConfigurations: Record<string, GenericWidgetConfiguration>
}

 export interface Endpoint {
   url: String,
   token: String
 }
