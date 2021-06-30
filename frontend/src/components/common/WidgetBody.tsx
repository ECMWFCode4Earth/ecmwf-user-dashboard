import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { kSize } from "../../library/constants/constants";


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


const WidgetBody: React.FC<WidgetBodyProps> = ({children, px, py}) => {

  const classes = useStyles();

  return (
    // noDrag is special className - can't click and drag element across grid.
    <Box className={`${classes.root} noDrag`} px={px} py={py}>
      {children}
    </Box>
  );

};


WidgetBody.defaultProps = {
  px: 0,
  py: 0,
}


export default WidgetBody;
