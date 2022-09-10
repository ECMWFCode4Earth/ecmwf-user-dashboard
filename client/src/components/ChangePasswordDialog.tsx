import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent, FormControl, IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { AuthContext } from "../utils/contexts/AuthContext";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}


const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose }) => {

  const { changePassword } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ severity: "", text: "" });


  const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if(newPassword.length==0){
      setMessage({severity:"error", text: "New Password can't be empty"})
      return;
    }
    try {
      await changePassword(newPassword);
      setMessage({ severity: "success", text: "Password changed successfully." });
    } catch (err) {
      setMessage({ severity: "error", text: err.message });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPassword(e.target.value);
  };
 const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <Box mb={1}>
          {message.text && (<Alert severity={message.severity as any}>{message.text}</Alert>)}
        </Box>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="filled-adornment-password" style={{marginLeft:"-0.7em"}}>New Password</InputLabel>
          <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handleOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {onClose(); setMessage({severity: "", text: ""})}} color={"primary"}>
          Cancel
        </Button>
        <Button onClick={handleChangePassword} color={"primary"}>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ChangePasswordDialog;
