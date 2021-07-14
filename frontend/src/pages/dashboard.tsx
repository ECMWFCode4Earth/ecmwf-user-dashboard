import React, { useContext } from "react";

import Layout from "../components/common/Layout";
import WidgetCanvas from "../components/WidgetCanvas";

import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";


const DashboardPage: React.FC = () => {

  const { widgetBuilders } = useContext(WidgetBuilderContext);

  const buildAllWidgets = () => widgetBuilders.map((builder) => builder.build());

  return (
    <Layout>
      <WidgetCanvas>
        {buildAllWidgets()}
      </WidgetCanvas>
    </Layout>
  );

};


export default DashboardPage;
