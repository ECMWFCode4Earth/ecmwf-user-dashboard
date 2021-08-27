import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import { kName } from "../../utils/constants/store";


const useStyles = makeStyles(
  (theme) => (
    {
      body: {
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
    <Box px={px} py={py} className={[classes.body, kName.CLASS_NO_DRAG].join(" ")}>
      {children}
    </Box>
  );

};


WidgetBody.defaultProps = {
  px: 0,
  py: 0,
};


export default WidgetBody;
