import { Layouts } from "react-grid-layout";

/**
 * Define types outside of files.
 * */


export interface TabManager {
  tabCount: number;
  activeTab: number;
  tabs: Tab[]
}


export interface Tab {
  uuid: string;
  name: string;
  shared: boolean;
  widgetIds: string[]; // Widget Ids contain useful information separated by "/". (tabNumber/builderClassId/uuid)
  layouts: Layouts
}
