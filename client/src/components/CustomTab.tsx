import React from "react";
import { makeStyles, Tab } from "@material-ui/core";
import { kSize } from "../utils/constants";


interface CustomTabProps {
  label?: string;
  icon?: any;
  onClick?: () => void;
}


const CustomTab: React.FC<CustomTabProps> = (props) => {

  const classes = useStyles();

  return (
    <Tab
      {...props}
      disableTouchRipple={true}
      label={<TabLabel label={props.label}/>}
      className={classes.tab}
    />
  );

};


interface TabLabelProps {
  label?: string;
}


const TabLabel: React.FC<TabLabelProps> = ({ label }) => {

  const classes = useStyles();

  return (
    <span className={classes.label}>{label}</span>
  );

};


const useStyles = makeStyles(
  (theme) => (
    {
      tab: {
        minHeight: kSize.TAB_HEIGHT,
        height: kSize.TAB_HEIGHT,
      },
      label: {
        position: "relative",
        fontSize: theme.typography.body2.fontSize,
      },
      closeButton: {
        position: "absolute",
        bottom: "0.0000005rem",
        left: "64px",
      }
    }
  )
);


export default CustomTab;
