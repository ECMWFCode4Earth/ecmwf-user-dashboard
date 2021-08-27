import React, { useState } from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import { kName, kSize } from "../../utils/constants/store";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        cursor: "move",
        height: kSize.WIDGET_TITLE_BAR
      },
      hidden: {
        justifyContent: "center",
        height: kSize.WIDGET_TITLE_BAR_HIDDEN,
      },
      button: {
        padding: 0
      }
    }
  )
);


interface WidgetTitleBarProps {
  title: string;
  onClose: (e: React.MouseEvent) => void;
}


const WidgetTitleBar: React.FC<WidgetTitleBarProps> = ({children, title, onClose}) => {

  const [hidden, setHidden] = useState(false);
  const classes = useStyles();

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  if (hidden) {
    return (
      <Box className={[classes.root, classes.hidden].join(" ")}>
        <IconButton onClick={toggleHidden} disableRipple color={"inherit"} size={"small"} className={kName.CLASS_NO_DRAG}>
          <MoreHorizIcon fontSize={"small"}/>
        </IconButton>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box p={1} className={kName.CLASS_NO_DRAG}>
        {children}
      </Box>
      <Box>
        <Typography variant={"h6"}>
          {title}
        </Typography>
      </Box>
      <Box px={1} className={kName.CLASS_NO_DRAG}>
        <IconButton onClick={toggleHidden} color={"inherit"} size={"small"}>
          <ExpandLessIcon fontSize={"small"}/>
        </IconButton>
        <IconButton onClick={onClose} color={"inherit"} size={"small"}>
          <CancelPresentationIcon fontSize={"small"}/>
        </IconButton>
      </Box>
    </Box>
  );

};


export default WidgetTitleBar;
