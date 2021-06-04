/**
 *
 * */

import React from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import { makeStyles, Toolbar, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.grey[500],
  }
}));


interface AppBarProps {

}


const AppBar = ({}: AppBarProps) => {

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
