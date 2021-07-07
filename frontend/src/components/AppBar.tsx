import React, { useContext } from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import { Button, makeStyles, Menu, MenuItem, Toolbar } from "@material-ui/core";

import { WidgetBuilder } from "../models/WidgetBuilder";
import { ServiceStatusWidgetBuilder } from "../models/ServiceStatusWidgetBuilder";
import { TextWidgetBuilder } from "../models/TextWidgetBuilder";
import { EventsWidgetBuilder } from "../models/EventsWidgetBuilder";

import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";
import { APIKeyWidgetBuilder } from "../models/APIKeyWidgetBuilder";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        flexGrow: 1,
      },
      appBar: {
        backgroundColor: theme.palette.grey[300],
      }
    }
  )
);


interface AppBarProps {
  openChartBrowser: () => void;
}


const AppBar: React.FC<AppBarProps> = ({openChartBrowser}) => {

  const classes = useStyles();
  const {widgetBuilders, setWidgetBuilders} = useContext(WidgetBuilderContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const builders = [ServiceStatusWidgetBuilder, TextWidgetBuilder, EventsWidgetBuilder, APIKeyWidgetBuilder];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addBuilder = (builder: WidgetBuilder) => {
    setWidgetBuilders([...widgetBuilders, builder]);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <MaterialAppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar variant="dense">

          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Add Widget
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {builders.map(builder => <MenuItem onClick={() => addBuilder(new builder())}>{(builder as any).widgetName}</MenuItem>)}
          </Menu>

          <Button onClick={openChartBrowser}>Chart Browser</Button>

        </Toolbar>
      </MaterialAppBar>
    </div>
  );

};


export default AppBar;
