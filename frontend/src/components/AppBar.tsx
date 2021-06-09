/**
 * App Bar
 * */

import React from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import { makeStyles, Toolbar } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.grey[500],
  }
}));


interface AppBar {

}


const AppBar: React.FC<AppBar> = ({}) => {

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <MaterialAppBar position="static" elevation={0} className={classes.appBar}>
          <Toolbar variant="dense">
            {/* TODO Add Menu Items */}
          </Toolbar>
        </MaterialAppBar>
      </div>
    </>
  );

};


export default AppBar;
