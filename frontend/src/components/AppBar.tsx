import React, { useContext } from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import { Button, makeStyles, Menu, MenuItem, Toolbar } from "@material-ui/core";

import { WidgetBuilder } from "../models/WidgetBuilder";
import { ServiceStatusWidgetBuilder } from "../models/ServiceStatusWidgetBuilder";
import { TextWidgetBuilder } from "../models/TextWidgetBuilder";
import { EventsWidgetBuilder } from "../models/EventsWidgetBuilder";
import { APIKeyWidgetBuilder } from "../models/APIKeyWidgetBuilder";
import { SatelliteAlertsWidgetBuilder } from "../models/SatelliteAlertsWidgetBuilder";

import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";
import ChartBrowser from "./ChartBrowser";
import { useDrawer } from "../library/hooks/useDrawer";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        flexGrow: 1,
      },
      appBar: {
        position: "static",
        backgroundColor: theme.palette.grey[300],
      }
    }
  )
);


const AppBar: React.FC = () => {

  const classes = useStyles();
  const { setWidgetBuilders } = useContext(WidgetBuilderContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { open, onOpen, onClose } = useDrawer(); // TODO Remove

  const builders = [ServiceStatusWidgetBuilder, TextWidgetBuilder, EventsWidgetBuilder, APIKeyWidgetBuilder, SatelliteAlertsWidgetBuilder];


  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const addBuilder = (builder: WidgetBuilder) => {
    setWidgetBuilders(widgetBuilders => [...widgetBuilders, builder]);
    closeMenu();
  };


  return (
    <>
      <div className={classes.root}>
        <MaterialAppBar elevation={0} className={classes.appBar}>
          <Toolbar variant={"dense"}>

            <Button onClick={openMenu}>
              Add Widget
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              {
                builders.map((builder) => (
                    <MenuItem onClick={() => addBuilder(new builder())}>
                      {(builder as any).widgetName}
                    </MenuItem>
                  )
                )
              }
            </Menu>

            {/* TODO Link to Chart Browser */}
            <Button onClick={onOpen}>Chart Browser</Button>

          </Toolbar>
        </MaterialAppBar>
      </div>

      {/* TODO Remove */}
      <ChartBrowser isOpen={open} onClose={onClose}/>
    </>

  );

};


export default AppBar;
