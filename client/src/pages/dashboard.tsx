import React, { useContext } from "react";
import { Box } from "@material-ui/core";

import Layout from "../components/common/Layout";
import TabBar from "../components/TabBar";
import CustomTab from "../components/CustomTab";
import TabPanel from "../components/TabPanel";
import WidgetCanvas from "../components/WidgetCanvas";

import { TabManagerContext } from "../utils/contexts/TabManagerContext";


export default function Dashboard() {

  const { tabManager, addNewTab, changeActiveTab, buildAllWidgetsOfCurrentTab } = useContext(TabManagerContext);


  const handleTabChange = (event: React.ChangeEvent<{}>, newActiveTab: number) => {
    changeActiveTab(newActiveTab);
  };

  const handleAddNewTab = () => {
    addNewTab();
  };


  return (
    <Layout showWidgetToolbar={true}>

      <TabBar activeTab={tabManager.activeTab} onChange={handleTabChange} onAddNewTab={handleAddNewTab}>
        {
          tabManager.tabs.map((tab, index) => (
            <CustomTab key={tab.uuid} label={tab.name}/>
          ))
        }
      </TabBar>

      <Box>
        {
          tabManager.tabs.map((tab, index) => (
            <TabPanel
              key={tab.uuid}
              value={tabManager.activeTab}
              index={index}
            >
              <WidgetCanvas>
                {buildAllWidgetsOfCurrentTab()}
              </WidgetCanvas>
            </TabPanel>
          ))
        }
      </Box>

    </Layout>
  );

}
