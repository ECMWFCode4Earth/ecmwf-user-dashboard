import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import { kName } from "../../library/constants/constants";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        flexGrow: 1,
        overflow: "scroll"
      }
    }
  )
);


interface WidgetBodyProps {
  px?: number;
  py?: number;
}


const WidgetBody: React.FC<WidgetBodyProps> = ({ children, px, py }) => {

  const classes = useStyles();

  return (
    <Box px={px} py={py} className={[classes.root, kName.CLASS_NO_DRAG].join(" ")}>
      {children}
    </Box>
  );

};


WidgetBody.defaultProps = {
  px: 0,
  py: 0,
};


export default WidgetBody;
