import React, { useState } from "react";
import { Box, Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(6)
      },
      container: {
        padding: `${theme.spacing(2)}px`,
        width: "50%"
      },
      form: {
        marginTop: "8px",
        "& > .field": {
          margin: "8px 0px"
        }
      }
    }
  )
);


const LoginPage: React.FC = ({}) => {

  const classes = useStyles();

  const [showLogin, setShowLogin] = useState(true);

  const toggleShowLogin = () => setShowLogin(showLogin => !showLogin);

  return (
    <>
      {
        showLogin ? (
          <Box className={classes.root}>
            <Paper elevation={2} className={classes.container}>
              <Typography variant={"h1"} align={"center"}>LOGIN</Typography>
              <form noValidate autoComplete="off" className={classes.form}>
                <TextField className={"field"} label={"Username"} fullWidth size={"small"}/>
                <TextField className={"field"} label={"Password"} fullWidth size={"small"}/>
                <Button className={"field"} fullWidth>CONTINUE</Button>
              </form>
              <Typography variant={"caption"} display={"block"} align={"center"} onClick={toggleShowLogin}>Don't have an
                account? Register</Typography>

            </Paper>
          </Box>
        ) : (
          <Box className={classes.root}>
            <Paper elevation={2} className={classes.container}>
              <Typography variant={"h1"} align={"center"}>REGISTER</Typography>
              <form noValidate autoComplete="off" className={classes.form}>
                <TextField className={"field"} label={"Username"} fullWidth size={"small"}/>
                <TextField className={"field"} label={"Password"} fullWidth size={"small"}/>
                <Button className={"field"} fullWidth>CONTINUE</Button>
              </form>
              <Typography variant={"caption"} display={"block"} align={"center"} onClick={toggleShowLogin}>Already have
                account? Login</Typography>
            </Paper>
          </Box>
        )
      }


    </>
  );

};


export default LoginPage;
