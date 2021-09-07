import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";


interface FullWidthButtonProps {
  my?: number;
  variant?: "info" | "warning" | "danger" | "success";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}


const FullWidthButton: React.FC<FullWidthButtonProps> = ({ children, my, variant, onClick }) => {
  const classes = useStyles();
  return (
    <Box my={my}>
      <Button
        fullWidth
        disableElevation
        variant={"contained"}
        color={"secondary"}
        onClick={onClick}
        className={variant ? classes[variant] : ""}
      >
        {children}
      </Button>
    </Box>
  );
};


const useStyles = makeStyles(
  (theme) => (
    {
      danger: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.error.dark,
        }
      },
      success: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.success.dark,
        }
      },
      warning: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.warning.dark
        }
      },
      info: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.info.dark
        }
      }
    }
  )
);


export default FullWidthButton;
