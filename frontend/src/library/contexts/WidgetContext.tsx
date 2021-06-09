/**
 * React context to keep track of widgets on canvas.
 * */

import React, { createContext, useState } from "react";
import { IWidget } from "../../models/IWidget";


const useWidget = () => {
  const [widgets, setWidgets] = useState<IWidget[]>([]);
  return { widgets, setWidgets };
};


interface WidgetContextType {
  widgets: IWidget[],
  setWidgets: React.Dispatch<React.SetStateAction<IWidget[]>>
}

const WidgetContext = createContext<WidgetContextType>({
  widgets: [], setWidgets: () => {
  }
});


const WidgetProvider: React.FC = ({ children }) => {

  const value = useWidget();

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  );

};


export default WidgetProvider;
export { WidgetContext };
