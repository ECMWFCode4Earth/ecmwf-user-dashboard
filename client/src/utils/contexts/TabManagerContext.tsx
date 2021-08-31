import React, { createContext, useEffect, useState } from "react";
import { Layouts } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { WidgetBuilder } from "../../models/widgetBuilders/WidgetBuilder";

import { Tab, TabManager } from "../types";
import { kLocalStoreKey, kStore } from "../constants";
import localStore from "../localStore";
import { builderClassIdToBuilderClassMap } from "../widgetUtils";
import axios from "axios";

/**
 * Tab Manager Context
 *
 * Manages a JS Object which defines tabs, layouts, and widgets.
 * */


// Initial state of Tab Manager - if there is no server side state or local state.
const initialTabManagerState: TabManager = {
  tabCount: 1,
  activeTab: 0, // uses zero indexing
  tabs: [
    {
      uuid: uuidv4(),
      name: "Tab 1",
      shared: false,
      widgetIds: [],
      layouts: {}
    }
  ]
};


// Tab Manager Hook - almost all the important utility functions related to tab mangers are described here.
const useTabManager = (initialState: TabManager) => {

  const [ready, setReady] = useState(false); // Determines if tab manager is ready to use.
  const [tabManager, setTabManager] = useState<TabManager>(initialState); // Hold the main JS Object which defines Tab Manger.


  /**
   * Side effects
   * */

  // Load tab manager state from server side or local storage.
  useEffect(() => {
    loadTabManager().catch((err) => console.error(err));
  }, []);

  // Save tab manager state on every change to tabManager object.
  useEffect(() => {
    saveTabManager().then(() => console.log(tabManager)).catch((err) => console.error(err));
  }, [tabManager]);

  /*
  * Utility functions
  * - loadTabManager
  * - saveTabManager
  * - addNewTab
  * - changeActiveTab
  * - loadLayoutsForCurrentTab
  * - saveLayoutsOfCurrentTab
  * - addNewWidgetToCurrentTab
  * - buildAllWidgetsOfCurrentTab
  * */


  // Load tab manager state from server side / local storage
  const loadTabManager = async () => {

    // TODO Server side state

    const res = await axios.get(`${kStore.BASE_URL}/api/load-tab-manager`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJlMTI1N2NiNzEzYzQzY2YzMTE0MDIiLCJpYXQiOjE2MzA0MDkzMTg2NjQsImV4cCI6MTYzMDQxMDUyODI2NH0._ZEhfHsGJOTwf9SlQYWJ0t1Qv8fI6JqmOntw6coPopo"
      } // TODO Change authorisation
    });

    const tabManager = res.data.data.tabManager;

    console.log(tabManager)
    // const tabManager = await localStore.getItem(kLocalStoreKey.TAB_MANAGER);
    if (tabManager === null) {
      await localStore.setItem(kLocalStoreKey.TAB_MANAGER, initialTabManagerState);
      return;
    } else {
      await localStore.setItem(kLocalStoreKey.TAB_MANAGER, tabManager);
    }
    setTabManager(tabManager as TabManager);
    setReady(true);
  };


  // Save tab manager state to local storage and server side
  const saveTabManager = async () => {
    await localStore.setItem(kLocalStoreKey.TAB_MANAGER, tabManager);
    const res = await axios.post(`${kStore.BASE_URL}/api/save-tab-manager`, { tabManager }, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJlMTI1N2NiNzEzYzQzY2YzMTE0MDIiLCJpYXQiOjE2MzA0MDkzMTg2NjQsImV4cCI6MTYzMDQxMDUyODI2NH0._ZEhfHsGJOTwf9SlQYWJ0t1Qv8fI6JqmOntw6coPopo"
      } // TODO Change authorisation
    });
    console.log(res.data);
  };


  // Add new tab in the dashboard
  const addNewTab = () => {

    // Define new tab
    const newTab: Tab = {
      uuid: uuidv4(),
      name: `Tab ${tabManager.tabCount + 1}`,
      shared: false,
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


  // Change active tab.
  const changeActiveTab = (newActiveTab: number) => {
    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.activeTab = newActiveTab;
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
    const newWidgetId = WidgetBuilder.generateWidgetId(currentTab, builderClassId);

    const newTabManagerState = _.cloneDeep(tabManager);
    newTabManagerState.tabs[currentTab].widgetIds.push(newWidgetId);

    // Set state
    setTabManager(newTabManagerState);

  };


  // Build widgets from widgets ids.
  const buildAllWidgetsOfCurrentTab = () => {
    const currentTab = tabManager.activeTab;
    const widgetIdsOfCurrentTab = tabManager.tabs[currentTab].widgetIds;

    return widgetIdsOfCurrentTab
      .map((widgetId) => WidgetBuilder.splitWidgetId(widgetId))
      .filter(({ builderClassId }) => builderClassId in builderClassIdToBuilderClassMap)
      .map(({ tabNumber, builderClassId, uuid }) => {
        return (new builderClassIdToBuilderClassMap[builderClassId as keyof typeof builderClassIdToBuilderClassMap].BuilderClass(tabNumber, uuid));
      })
      .map((widgetBuilder) => widgetBuilder.build());
  };


  /*
  * Return tab manager and utility functions
  * */

  return {
    ready,
    tabManager,
    addNewTab,
    changeActiveTab,
    loadLayoutsForCurrentTab,
    saveLayoutsOfCurrentTab,
    addNewWidgetToCurrentTab,
    buildAllWidgetsOfCurrentTab,
  };

};


const TabManagerContext = createContext<ReturnType<typeof useTabManager>>(
  {
    ready: false,
    tabManager: initialTabManagerState,
    addNewTab: () => 0,
    changeActiveTab: () => {},
    loadLayoutsForCurrentTab: () => ({}),
    saveLayoutsOfCurrentTab: () => {},
    addNewWidgetToCurrentTab: () => {},
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
