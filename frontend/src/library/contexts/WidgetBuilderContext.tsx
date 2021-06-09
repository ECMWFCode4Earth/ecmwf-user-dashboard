/**
 * React context to keep track of widget builders across the application.
 * */

import React, { createContext, useState } from "react";
import { IWidgetBuilder } from "../../models/IWidgetBuilder";


const useWidgetBuilder = () => {
  const [widgetBuilders, setWidgetBuilders] = useState<IWidgetBuilder[]>([]);
  return { widgetBuilders, setWidgetBuilders };
};


interface WidgetBuilderContext {
  widgetBuilders: IWidgetBuilder[],
  setWidgetBuilders: React.Dispatch<React.SetStateAction<IWidgetBuilder[]>>
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
