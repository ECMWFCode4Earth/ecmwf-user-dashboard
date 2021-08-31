import React, { useContext } from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import {
  makeStyles,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";

import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import { builderClassIdToBuilderClassMap } from "../utils/widgetUtils";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        flexGrow: 1,
      },
      appBar: {
        position: "static",
        backgroundColor: theme.palette.grey[300],
      },
      buttonsContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }
    }
  )
);


const AppBar: React.FC = () => {

  const classes = useStyles();
  const { addNewWidgetToCurrentTab } = useContext(TabManagerContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const addNewWidget = (builderClassId: string) => {
    addNewWidgetToCurrentTab(builderClassId);
    closeMenu();
  };


  return (
    <div className={classes.root}>
      <MaterialAppBar elevation={0} className={classes.appBar}>
        <Toolbar variant={"dense"}>
          <Box className={classes.buttonsContainer}>

            <Box>

              <Button onClick={openMenu}>
                Add Widget
              </Button>
              <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                {
                  Object.keys(builderClassIdToBuilderClassMap).map((builderClassId, idx) => (
                      <MenuItem
                        key={`MenuItem-${idx}`}
                        onClick={() => addNewWidget(builderClassId)}>
                        {(builderClassIdToBuilderClassMap as any)[builderClassId].name}
                      </MenuItem>
                    )
                  )
                }
              </Menu>

              <Button onClick={() => alert("Under migration")}>
                Chart Browser
              </Button>

            </Box>

            <Box>
              <Button>
                Share Tab
              </Button>
            </Box>

          </Box>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );

};


export default AppBar;
