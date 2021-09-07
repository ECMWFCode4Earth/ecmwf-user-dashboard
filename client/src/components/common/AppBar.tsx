import React, { useContext } from "react";
import { AppBar as MaterialAppBar, Box, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";

import { AuthContext } from "../../utils/contexts/AuthContext";


const AppBar: React.FC = () => {

  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <MaterialAppBar color={"primary"} elevation={0} position={"static"}>
      <Toolbar variant={"dense"}>
        <Box alignItems={"center"} display={"flex"} flexGrow={1}>
          <Image layout={"fixed"} src={"/ecmwf-logo.png"} width={140} height={24}/>
          <Typography variant={"h6"} className={classes.title}>
            User Dashboard
          </Typography>
        </Box>


        {!isAuthenticated() && (
          <Button color={"inherit"} onClick={() => handleNavigation("/login")}>Login</Button>
        )}

        {
          (isAuthenticated() && router.pathname !== "/account") && (
            <Button color={"inherit"} onClick={() => handleNavigation("/account")}>My Account</Button>
          )
        }

        {
          (router.pathname !== "/dashboard") && (
            <Button color={"inherit"} onClick={() => handleNavigation("/dashboard")}>Dashboard</Button>
          )
        }


      </Toolbar>
    </MaterialAppBar>
  );

};


const useStyles = makeStyles(
  (theme) => (
    {
      title: {
        marginLeft: theme.spacing(2),
      },
    }
  )
);


export default AppBar;
