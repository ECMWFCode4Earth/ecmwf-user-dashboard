import React, { createContext, useContext, useEffect, useState } from "react";
import { Layouts } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { WidgetBuilder } from "../../models/widgetBuilders/WidgetBuilder";

import { Tab, TabManager, UserDetails } from "../types";
import { kLocalStoreKey, kStore } from "../constants";
import localStore from "../localStore";
import { builderClassIdToBuilderClassMap } from "../widgetUtils";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { ChartWidgetConfiguration } from "../../components/widgets/ChartWidgetBlueprint";


/**
 * Tab Manager Context
 *
 * Manages a JS Object which defines tabs, layouts, and widgets.
 * */


// Initial state of Tab Manager - if there is no server side state or local state.
const initialTabManagerState: TabManager = {
  tabCount: 1,
  activeTab: 0, // uses zero indexing
  lastSavedTimestamp: new Date(),
  tabs: [
    {
      uuid: uuidv4(),
      name: "Tab 1",
      shared: false,
      sharedWithUsers: [],
      widgetIds: [],
      layouts: {}
    }
  ],
  widgetConfigurations: {}
};


// Tab Manager Hook - almost all the important utility functions related to tab mangers are described here.
const useTabManager = (initialState: TabManager) => {

  const { user } = useContext(AuthContext);
  const [ready, setReady] = useState(false); // Determines if tab manager is ready to use.
  const [tabManager, setTabManager] = useState<TabManager>(initialState); // Hold the main JS Object which defines Tab Manger.


  /**
   * Side effects
   * */

  // Load tab manager state from server side or local storage.
  useEffect(() => {
    loadTabManager().catch((err) => console.error(err));
  }, []);

  // Load tab manager state when auth changes.
  useEffect(() => {
    loadTabManager().catch((err) => console.error(err));
  }, [user]);

  // Save tab manager state on every change to tabManager object.
  useEffect(() => {
    if (ready) {
      saveTabManager()
        .then(() => console.log("Debug", tabManager))
        .catch((err) => console.error(err));
    }
  }, [tabManager]);


  /*
  * Utility functions
  * */

  // Load tab manager state from server side / local storage
  const loadTabManager = async () => {

    let tabManager: TabManager = initialTabManagerState;

    const userDetails: UserDetails | null = await localStore.getItem(kLocalStoreKey.USER_DETAILS);
    const storedTabManger = await localStore.getItem(kLocalStoreKey.TAB_MANAGER);

    if (storedTabManger) {
      tabManager = storedTabManger as TabManager;
    }

    if (userDetails) {
      const res = await axios.get(`${kStore.BASE_URL}/api/load-tab-manager`, {
        headers: {
          Authorization: userDetails?.token
        }
      });
      if (res.status === 200) {
        tabManager = res.data.data.tabManager;
      }
    }

    await localStore.setItem(kLocalStoreKey.TAB_MANAGER, tabManager);
    setTabManager(tabManager);
    setReady(true);

  };


  // Save tab manager state to local storage and server side
  const saveTabManager = async () => {

    tabManager.lastSavedTimestamp = new Date();

    await localStore.setItem(kLocalStoreKey.TAB_MANAGER, tabManager);

    const userDetails: UserDetails | null = await localStore.getItem(kLocalStoreKey.USER_DETAILS);
    if (userDetails) {
      const res = await axios.post(`${kStore.BASE_URL}/api/save-tab-manager`, { tabManager }, {
        headers: {
          Authorization: userDetails?.token
        }
      });
    }

  };


  // Clear tab manager from client side as well server side
  const clearTabManager = async () => {
    await localStore.removeItem(kLocalStoreKey.TAB_MANAGER);

    const userDetails: UserDetails | null = await localStore.getItem(kLocalStoreKey.USER_DETAILS);
    if (userDetails) {
      const res = await axios.post(`${kStore.BASE_URL}/api/clear-tab-manager`, {}, {
        headers: {
          Authorization: userDetails?.token
        }
      });
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
    }
  };


  // Add new tab in the dashboard
  const addNewTab = () => {

    // Define new tab
    const newTab: Tab = {
      uuid: uuidv4(),
      name: `Tab ${tabManager.tabCount + 1}`,
      shared: false,
      sharedWithUsers: [],
      widgetIds: [],
      layouts: {}
    };

    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.tabs.push(newTab);
    newTabManagerState.tabCount = newTabManagerState.tabs.length;
    newTabManagerState.activeTab = newTabManagerState.tabs.length - 1;

    // Save new tab manager state.
    setTabManager(newTabManagerState);

    return newTabManagerState.activeTab;
  };


  // Remove current tab
  const removeCurrentTab = () => {

    const newTabManagerState = _.cloneDeep(tabManager);

    newTabManagerState.tabs = newTabManagerState.tabs.filter((tab, index) => index !== newTabManagerState.activeTab);
    newTabManagerState.tabCount--;
    if (newTabManagerState.activeTab !== 0) {
      newTabManagerState.activeTab--;
    }

    // Boundary condition
    if (newTabManagerState.tabCount < 1) return null;

    setTabManager(newTabManagerState);

    return newTabManagerState.activeTab;
  };


  // Change active tab.
  const changeActiveTab = (newActiveTab: number) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.activeTab = newActiveTab;
    setTabManager(newTabManagerState);
  };


  // Rename active tab.
  const renameCurrentTab = (newName: string) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.tabs[newTabManagerState.activeTab].name = newName;
    setTabManager(newTabManagerState);
  };


  // Share active tab.
  const shareCurrentTab = (username: string) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    const sharedWithUsers = newTabManagerState.tabs[newTabManagerState.activeTab].sharedWithUsers;
    if (!sharedWithUsers.includes(username)) {
      sharedWithUsers.push(username);
    }
    newTabManagerState.tabs[newTabManagerState.activeTab].sharedWithUsers = sharedWithUsers;
    if (sharedWithUsers.length > 0) {
      newTabManagerState.tabs[newTabManagerState.activeTab].shared = true;
    }
    setTabManager(newTabManagerState);
  };


  // Stop sharing current tab with user.
  const stopSharingCurrentTab = (username: string) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    const sharedWithUsers = newTabManagerState.tabs[newTabManagerState.activeTab].sharedWithUsers;
    newTabManagerState.tabs[newTabManagerState.activeTab].sharedWithUsers = sharedWithUsers.filter((sharedWithUsername) => sharedWithUsername !== username);
    if (newTabManagerState.tabs[newTabManagerState.activeTab].sharedWithUsers.length === 0) {
      newTabManagerState.tabs[newTabManagerState.activeTab].shared = false;
    }
    setTabManager(newTabManagerState);
  };


  // Returns layouts of current tab.
  const loadLayoutsForCurrentTab = () => {
    return tabManager.tabs[tabManager.activeTab].layouts;
  };


  // Save layouts of current tab.
  const saveLayoutsOfCurrentTab = (layouts: Layouts) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.tabs[tabManager.activeTab].layouts = layouts;
    setTabManager(newTabManagerState);
  };


  // Takes builder class id -> Generates a new widget id (string) -> Stores it in tab manager state.
  const addNewWidgetToCurrentTab = (builderClassId: string) => {

    const currentTab = tabManager.activeTab;

    // Generate new widget id
    const newWidgetId = WidgetBuilder.generateWidgetId(builderClassId);

    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.tabs[currentTab].widgetIds.push(newWidgetId);

    // Set state
    setTabManager(newTabManagerState);

    return newWidgetId;
  };


  // Special case -  add chart widget to current tab.
  const addNewChartWidgetToCurrentTab = (chartName: string) => {

    const newTabManagerState = _.cloneDeep(tabManager);

    const chartWidgetConfiguration: ChartWidgetConfiguration = {
      chartName: chartName,
    };

    const currentTab = newTabManagerState.activeTab;
    const newChartWidgetId = WidgetBuilder.generateWidgetId("chart-widget");
    newTabManagerState.tabs[currentTab].widgetIds.push(newChartWidgetId);
    newTabManagerState.widgetConfigurations[newChartWidgetId] = chartWidgetConfiguration;

    // Set state
    setTabManager(newTabManagerState);

  };


  // Remove widget from current tab.
  const removeWidgetFromCurrentTab = (widgetIdToRemove: string) => {
    const newTabManagerState = _.cloneDeep(tabManager);

    // Current info
    const activeTab = newTabManagerState.activeTab;
    const widgetIdsOfCurrentTab = newTabManagerState.tabs[newTabManagerState.activeTab].widgetIds;

    // Remove widget id
    newTabManagerState.tabs[activeTab].widgetIds = widgetIdsOfCurrentTab.filter((widgetId) => widgetId !== widgetIdToRemove);

    // Remove widget configuration if any
    if (widgetIdToRemove in newTabManagerState.widgetConfigurations) {
      delete newTabManagerState.widgetConfigurations[widgetIdToRemove];
    }

    // Set state
    setTabManager(newTabManagerState);
  };


  // Save widget configuration.
  const saveWidgetConfiguration = (widgetId: string, widgetConfiguration: Record<string, any>) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.widgetConfigurations[widgetId] = widgetConfiguration;
    setTabManager(newTabManagerState);
  };


  // Load widget configuration.
  const loadWidgetConfiguration = (widgetId: string) => {
    return tabManager.widgetConfigurations[widgetId];
  };


  // Build widgets from widgets ids.
  const buildAllWidgetsOfCurrentTab = () => {
    const currentTab = tabManager.activeTab;
    const widgetIdsOfCurrentTab = tabManager.tabs[currentTab].widgetIds;

    return widgetIdsOfCurrentTab
      .map((widgetId) => WidgetBuilder.splitWidgetId(widgetId))
      .filter(({ builderClassId }) => builderClassId in builderClassIdToBuilderClassMap)
      .map(({ builderClassId, uuid }) => {
        return (new builderClassIdToBuilderClassMap[builderClassId as keyof typeof builderClassIdToBuilderClassMap].BuilderClass(uuid));
      })
      .map((widgetBuilder) => widgetBuilder.build());
  };


  /*
  * Return tab manager and utility functions
  * */

  return {
    ready,
    tabManager,
    clearTabManager,
    addNewTab,
    removeCurrentTab,
    changeActiveTab,
    renameCurrentTab,
    shareCurrentTab,
    stopSharingCurrentTab,
    loadLayoutsForCurrentTab,
    saveLayoutsOfCurrentTab,
    addNewWidgetToCurrentTab,
    addNewChartWidgetToCurrentTab,
    removeWidgetFromCurrentTab,
    saveWidgetConfiguration,
    loadWidgetConfiguration,
    buildAllWidgetsOfCurrentTab,
  };

};


const TabManagerContext = createContext<ReturnType<typeof useTabManager>>(
  {
    ready: false,
    tabManager: initialTabManagerState,
    clearTabManager: async () => {},
    addNewTab: () => 0,
    removeCurrentTab: () => null,
    changeActiveTab: () => {},
    renameCurrentTab: () => {},
    shareCurrentTab: () => {},
    stopSharingCurrentTab: () => {},
    loadLayoutsForCurrentTab: () => ({}),
    saveLayoutsOfCurrentTab: () => {},
    addNewWidgetToCurrentTab: () => "",
    addNewChartWidgetToCurrentTab: () => {},
    removeWidgetFromCurrentTab: () => {},
    saveWidgetConfiguration: () => {},
    loadWidgetConfiguration: () => ({}),
    buildAllWidgetsOfCurrentTab: () => [],
  }
);


const TabManagerProvider: React.FC = ({ children }) => {

  const value = useTabManager(initialTabManagerState);

  if (!value.ready) return (<div/>);

  return (
    <TabManagerContext.Provider value={value}>
      {children}
    </TabManagerContext.Provider>
  );

};


export default TabManagerProvider;
export { TabManagerContext };
