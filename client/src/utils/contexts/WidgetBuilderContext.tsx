import React, { createContext, useEffect, useState } from "react";

import { WidgetBuilder } from "../../models/widgetBuilders/WidgetBuilder";

import { builderClassIdToBuilderClassMap } from "../widget";
import localStore from "../localStore";


const useWidgetBuilder = () => {

  // Base state
  const [widgetBuilders, setWidgetBuilders] = useState<WidgetBuilder[]>([]);
  const [ready, setReady] = useState(false)


  /**
   * Side effects
   * */

  // Get widgets from local storage - TODO from backend
  useEffect(() => {
    fetchSavedWidgets().catch((err) => console.log(err));
  }, []);

  // On change in widgetBuilders, save widgets
  useEffect(() => {
    saveWidgetBuilders().catch((err) => console.log(err));
  }, [widgetBuilders]);


  /**
   * Side effect functions
   * */

  const fetchSavedWidgets = async () => {
    const storedWidgetIds = await localStore.getItem("widgetIds");
    if (storedWidgetIds === null) {
      await localStore.setItem("widgetIds", []);
      return;
    }
    const widgetBuilders = (storedWidgetIds as string[])
      .map(storedWidgetId => storedWidgetId.split("/")) // [tabNo, widgetBuilderClassId, uuid]
      .map((storedWidgetIdSplit) => {
        const [tabNo, builderClassId, uuid] = storedWidgetIdSplit;
        const widgetBuilderClass = (builderClassIdToBuilderClassMap as any)[builderClassId].builderClass;
        if (widgetBuilderClass) {
          return new widgetBuilderClass(Number(tabNo), uuid);
        }
        return null;
      })
      .filter(widgetBuilder => widgetBuilder !== null);

    setWidgetBuilders(widgetBuilders);
    setReady(true);
  };

  const saveWidgetBuilders = async () => {
    const widgetIds = widgetBuilders.map((widgetBuilder) => widgetBuilder.widgetId);
    await localStore.setItem("widgetIds", widgetIds);
  };


  /**
   * Vital functions
   * */

  const removeWidgetBuilder = (builderToRemove: WidgetBuilder) => {
    setWidgetBuilders((widgetBuilders) => widgetBuilders.filter(widgetBuilder => widgetBuilder.widgetId !== builderToRemove.widgetId));
  };


  return { widgetBuilders, setWidgetBuilders, removeWidgetBuilder, ready };
};


const WidgetBuilderContext = createContext<ReturnType<typeof useWidgetBuilder>>(
  { widgetBuilders: [], setWidgetBuilders: () => null, removeWidgetBuilder: () => null, ready: false }
);


const WidgetBuilderProvider: React.FC = ({ children }) => {

  const value = useWidgetBuilder();

  if (!value.ready) return (<div />)

  return (
    <WidgetBuilderContext.Provider value={value}>
      {children}
    </WidgetBuilderContext.Provider>
  );

};


export default WidgetBuilderProvider;
export { WidgetBuilderContext };
