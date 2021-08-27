import React, { createContext, useEffect, useState } from "react";

import { GlobalConfiguration } from "../constants/types";
import localStore from "../localStore";


const defaultConfiguration: GlobalConfiguration = {
  tabDetails: {
    count: 1,
    activeTab: 0 // Follows zero indexing
  }
}


const useGlobalContext = (initialConfiguration: GlobalConfiguration) => {
  const [globalConfiguration, setGlobalConfiguration] = useState<GlobalConfiguration>(initialConfiguration);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchTabDetails().catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    saveTabDetails().catch((err) => console.log(err))
  }, [globalConfiguration])

  const fetchTabDetails = async () => {
    const tabDetails = await localStore.getItem("tabDetails");
    if (tabDetails === null) {
      await localStore.setItem("tabDetails", defaultConfiguration.tabDetails);
      return;
    }
    setGlobalConfiguration((globalConfiguration) => {
      return {
        ...globalConfiguration,
        tabDetails: tabDetails as any
      }
    })
    setReady(true);
  }

  const saveTabDetails = async () => {
    await localStore.setItem("tabDetails", globalConfiguration.tabDetails);
    console.log(globalConfiguration.tabDetails)
  }

  return { globalConfiguration, setGlobalConfiguration, ready };
};


const GlobalContext = createContext<ReturnType<typeof useGlobalContext>>(
  { globalConfiguration: defaultConfiguration, setGlobalConfiguration: () => {}, ready: false }
);


const GlobalContextProvider: React.FC = ({ children }) => {

  const value = useGlobalContext(defaultConfiguration);

  if (!value.ready) return (<div />)

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );

};


export default GlobalContextProvider;
export { GlobalContext };
