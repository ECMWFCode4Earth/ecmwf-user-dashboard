import React from "react";
import { AppBar, makeStyles, Tabs } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import CustomTab from "./CustomTab";

import { kSize } from "../utils/constants";


interface TabBarProps {
  activeTab: number;
  onChange: (e: any, value: any) => void;
  onAddNewTab: () => void;
}


const TabBar: React.FC<TabBarProps> = ({ children, activeTab, onChange, onAddNewTab }) => {

  const classes = useStyles();

  return (
    <AppBar elevation={0} position={"static"} color={"primary"}>
      <Tabs value={activeTab} onChange={onChange} variant={"scrollable"} className={classes.tabs}>

        {children}

        <CustomTab icon={<AddIcon />} onClick={onAddNewTab} />

      </Tabs>
    </AppBar>
  );
};


const useStyles = makeStyles(
  (theme) => ({
    tabs: {
      minHeight: kSize.TAB_BAR_HEIGHT,
      height: kSize.TAB_BAR_HEIGHT
    }
  })
);


export default TabBar;
