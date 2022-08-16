import { v4 as uuidv4 } from "uuid";
import { TabManager } from "./types";


export const initialTabManagerState: TabManager = {
  tabCount: 1,
  lastSavedTimestamp: new Date(),
  activeTab: 0, // uses zero indexing
  tabs: [
    {
      uuid: uuidv4(),
      name: "Tab 1",
      shared: false,
      sharedWithUsers: [],
      widgetIds: [],
      layouts: {},
      widgetConfigurations: {}
    }
  ],
};
