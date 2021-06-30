import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { kSize } from "../../library/constants/constants";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        height: `calc(100% - ${kSize.WIDGET_TITLE_BAR})`,
        overflow: "scroll"
      }
    }
  )
);


interface WidgetBodyProps {

}


const WidgetBody: React.FC<WidgetBodyProps> = ({children}) => {

  const classes = useStyles();

  return (
    // noDrag is special className - can't click and drag element across grid.
    <Box className={`${classes.root} noDrag`}>
      {children}
    </Box>
  );

};


export default WidgetBody;
