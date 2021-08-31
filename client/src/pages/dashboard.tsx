import React, { useContext, useState } from "react";
import { makeStyles, AppBar, Tabs, Tab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Layout from "../components/common/Layout";
import WidgetCanvas from "../components/WidgetCanvas";

import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import TabPanel from "../components/TabPanel";


const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      backgroundColor: theme.palette.grey[800]
    }
  })
);


export default function Dashboard() {

  const classes = useStyles();
  const { tabManager, addNewTab, changeActiveTab, buildAllWidgetsOfCurrentTab } = useContext(TabManagerContext);
  const [activeTab, setActiveTab] = useState(tabManager.activeTab);


  const handleTabChange = (event: React.ChangeEvent<{}>, newActiveTab: number) => {
    changeActiveTab(newActiveTab);
    setActiveTab(newActiveTab);
  };

  const handleAddNewTab = () => {
    setActiveTab(addNewTab());
  };


  return (
    <Layout>
      <div className={classes.root}>

        <AppBar position={"static"} elevation={0} className={classes.appBar}>
          <Tabs value={activeTab} onChange={handleTabChange}>

            {
              Array(tabManager.tabCount).fill(0).map((_, index) => {
                return (
                  <Tab
                    key={tabManager.tabs[index].uuid}
                    label={tabManager.tabs[index].name}
                  />
                );
              })
            }

            <IconButton color={"inherit"} onClick={handleAddNewTab}>
              <AddIcon/>
            </IconButton>

          </Tabs>
        </AppBar>

        {
          Array(tabManager.tabCount).fill(0).map((_, index) => (
            <TabPanel
              key={tabManager.tabs[index].uuid}
              value={activeTab}
              index={index}
            >
              <WidgetCanvas>
                {buildAllWidgetsOfCurrentTab()}
              </WidgetCanvas>
            </TabPanel>
          ))
        }

      </div>
    </Layout>
  );

}






