import React from "react";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@material-ui/core";


interface LoginFormProps {
  loading?: boolean;
  onChange?: React.FormEventHandler<HTMLFormElement>;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  toggleForm?: () => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onChange, onSubmit, toggleForm, loading }) => {
  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Box mb={1}>
          <Typography variant={"h5"} align={"center"}><b>LOGIN</b></Typography>
          <Typography variant={"body2"} align={"center"}>
            Please login to fully experience ECWMF User Dashboard.
          </Typography>
        </Box>
        <Box mb={1}>
          <form onChange={onChange}>
            <TextField
              fullWidth
              name={"username"}
              label={"Username"}
              margin={"dense"}
            />
            <TextField
              fullWidth
              name={"password"}
              label={"Password"}
              type={"password"}
              margin={"dense"}
            />
          </form>
        </Box>
      </CardContent>
      <CardActions>
        <Box px={1} mb={0.5} width={"100%"} textAlign={"center"}>
          <Button
            fullWidth
            disableElevation
            disabled={!!loading}
            variant={"contained"}
            color={"secondary"}
            onClick={onSubmit}
          >
            Continue
          </Button>
          <Button
            variant={"text"}
            size={"small"}
            style={{ marginTop: "12px" }}
            onClick={toggleForm}
          >
            Dont have an account? Sign Up!
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};


export default LoginForm;
