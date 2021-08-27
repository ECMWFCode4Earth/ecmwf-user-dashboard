import React, { useContext, useState } from "react";
import { makeStyles, AppBar, Tabs, Tab, Typography, Box, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Layout from "../components/common/Layout";
import WidgetCanvas from "../components/WidgetCanvas";

import { WidgetBuilderContext } from "../utils/contexts/WidgetBuilderContext";
import { GlobalContext } from "../utils/contexts/GlobalContext";


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



  const { widgetBuilders } = useContext(WidgetBuilderContext);
  const { globalConfiguration, setGlobalConfiguration } = useContext(GlobalContext);

  const { tabDetails } = globalConfiguration;

  const classes = useStyles();
  const [value, setValue] = useState(tabDetails.activeTab);

  const buildAllWidgets = (value: number) => {
    console.log(widgetBuilders)
    console.log(value)
    console.log(widgetBuilders.filter((builder) => builder.tabNo === value))
    return widgetBuilders.filter((builder) => builder.tabNo === value).map((builder) => builder.build());
  };
  // const buildAllWidgets = (value: number) => widgetBuilders.map((builder) => builder.build());

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setGlobalConfiguration(globalConfiguration => ({
      ...globalConfiguration,
      tabDetails: { count: tabDetails.count, activeTab: newValue }
    }));
    setValue(newValue);
  };

  const addTab = () => {
    setGlobalConfiguration(globalConfiguration => ({
      ...globalConfiguration,
      tabDetails: { count: tabDetails.count + 1, activeTab: tabDetails.count }
    }));
    setValue(tabDetails.count);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <AppBar position={"static"} className={classes.appBar} elevation={0}>
          <Tabs value={value} onChange={handleChange}>
            {
              Array(tabDetails.count)
                .fill(0)
                .map((_, idx) => <Tab key={`Tab-${idx}`} label={`Tab ${idx + 1}`}/>)
            }
            <IconButton onClick={addTab} color={"inherit"}>
              <AddIcon/>
            </IconButton>
          </Tabs>
        </AppBar>
        {
          Array(tabDetails.count)
            .fill(0)
            .map((_, idx) => (
              <TabPanel key={`TabPanel-${idx}`} value={value} index={idx}>
                <WidgetCanvas>
                  {buildAllWidgets(value)}
                </WidgetCanvas>
              </TabPanel>
            ))
        }
      </div>
    </Layout>
  );

}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}




