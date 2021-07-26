import React, { createContext, useState } from "react";
import { GlobalConfiguration } from "../constants/types";


const defaultConfiguration: GlobalConfiguration = {

}


const useGlobalContext = (initialConfiguration: GlobalConfiguration) => {
  const [globalConfiguration, setGlobalConfiguration] = useState<GlobalConfiguration>(initialConfiguration)
  return { globalConfiguration, setGlobalConfiguration };
};


const GlobalContext = createContext<ReturnType<typeof useGlobalContext>>(
  { globalConfiguration: {}, setGlobalConfiguration: () => {} }
);


const GlobalContextProvider: React.FC = ({ children }) => {

  const value = useGlobalContext(defaultConfiguration);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );

};


export default GlobalContextProvider;
export { GlobalContext };
