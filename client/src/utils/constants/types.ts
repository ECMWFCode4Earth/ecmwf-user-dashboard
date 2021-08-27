import { Layouts } from "react-grid-layout";


export interface GlobalConfiguration {
  tabDetails: {
    count: number;
    activeTab: number;
  }
}

export interface SingleTabDetails {
  tabNumber: number;
  name: string;
  uuid: string;
  widgetIds: string[];
  layout: Layouts
}
