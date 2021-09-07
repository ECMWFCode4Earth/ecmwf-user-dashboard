import React, { useContext, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { AuthContext } from "../utils/contexts/AuthContext";


interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}


const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose }) => {

  const { changePassword } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ severity: "", text: "" });


  const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
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


  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <Box mb={1}>
          {message.text && (<Alert severity={message.severity as any}>{message.text}</Alert>)}
        </Box>
        <TextField
          onChange={handleOnChange}
          value={newPassword}
          autoFocus
          margin={"dense"}
          label={"New Password"}
          type={"text"}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={"primary"}>
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
