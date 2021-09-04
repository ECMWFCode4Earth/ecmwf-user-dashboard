import { Layouts } from "react-grid-layout";


export interface TabManager {
  tabCount: number;
  activeTab: number;
  lastSavedTimestamp: Date | string;
  tabs: Tab[];
  widgetConfigurations: Record<string, Record<string, any>>;
}


export interface Tab {
  uuid: string;
  name: string;
  shared: boolean;
  sharedWithUsers: string[];
  widgetIds: string[]; // Widget Ids contain useful information separated by "/". (builderClassId/uuid)
  layouts: Layouts
}
