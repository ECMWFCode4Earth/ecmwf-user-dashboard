import { Layouts } from "react-grid-layout";
import {GenericWidgetConfiguration} from "../components/widgets/GenericWidgetBlueprint";

/**
 * Define types outside of files.
 * */


export interface TabManager {
  tabCount: number;
  activeTab: number;
  lastSavedTimestamp: Date | string;
  tabs: Tab[];
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


// Stored in browsers local storage.
export interface UserDetails {
  name: string,
  username: string,
  token: string,
  tokenExpirationDate: string | Date
}
