import React, { createContext, useState } from "react";

import { WidgetBuilder } from "../../models/WidgetBuilder";


const useWidgetBuilder = () => {
  const [widgetBuilders, setWidgetBuilders] = useState<WidgetBuilder[]>([]);

  const removeWidgetBuilder = (builderToRemove: WidgetBuilder) => {
    setWidgetBuilders((widgetBuilders) => widgetBuilders.filter(widgetBuilder => widgetBuilder.id !== builderToRemove.id));
  };

  return { widgetBuilders, setWidgetBuilders, removeWidgetBuilder };
};


const WidgetBuilderContext = createContext<ReturnType<typeof useWidgetBuilder>>(
  { widgetBuilders: [], setWidgetBuilders: () => null, removeWidgetBuilder: () => null }
);


const WidgetBuilderProvider: React.FC = ({ children }) => {

  const value = useWidgetBuilder();

  return (
    <WidgetBuilderContext.Provider value={value}>
      {children}
    </WidgetBuilderContext.Provider>
  );

};


export default WidgetBuilderProvider;
export { WidgetBuilderContext };
