/**
 * React context to keep track of widget builders across the application.
 * */

import React, { createContext, useState } from "react";
import { WidgetBuilder } from "../../models/WidgetBuilder";


const useWidgetBuilder = () => {
  const [widgetBuilders, setWidgetBuilders] = useState<WidgetBuilder[]>([]);
  return { widgetBuilders, setWidgetBuilders };
};


interface WidgetBuilderContext {
  widgetBuilders: WidgetBuilder[],
  setWidgetBuilders: React.Dispatch<React.SetStateAction<WidgetBuilder[]>>
}

const WidgetBuilderContext = createContext<WidgetBuilderContext>({
    widgetBuilders: [], setWidgetBuilders: () => null
  })
;


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
