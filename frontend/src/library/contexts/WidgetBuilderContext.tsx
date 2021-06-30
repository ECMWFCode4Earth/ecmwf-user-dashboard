/**
 * React context to keep track of widget builders across the application.
 * */

import React, { createContext, useState } from "react";

import { WidgetBuilder } from "../../models/WidgetBuilder";


const useWidgetBuilder = () => {
  const [widgetBuilders, setWidgetBuilders] = useState<WidgetBuilder[]>([]);

  const removeWidgetBuilder = (builderToRemove: WidgetBuilder) => {
    setWidgetBuilders(widgetBuilders.filter(widgetBuilder => widgetBuilder.key !== builderToRemove.key));
  };

  return {widgetBuilders, setWidgetBuilders, removeWidgetBuilder};
};


const WidgetBuilderContext = createContext<ReturnType<typeof useWidgetBuilder>>(
  {
    widgetBuilders: [], setWidgetBuilders: () => null, removeWidgetBuilder: () => null
  }
);


const WidgetBuilderProvider: React.FC = ({children}) => {

  const value = useWidgetBuilder();

  return (
    <WidgetBuilderContext.Provider value={value}>
      {children}
    </WidgetBuilderContext.Provider>
  );

};


export default WidgetBuilderProvider;
export { WidgetBuilderContext };
