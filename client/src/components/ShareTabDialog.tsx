import React, { useContext, useEffect, useState } from "react";
import { Box, Chip, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";


interface ShareTabDialogProps {
  open: boolean;
  onClose: () => void;
}


const ShareTabDialog: React.FC<ShareTabDialogProps> = ({ open, onClose }) => {

  const { tabManager, shareCurrentTab, stopSharingCurrentTab } = useContext(TabManagerContext);
  const [username, setUsername] = useState("");


  const shareTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    shareCurrentTab(username);
    setUsername("");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(e.target.value);
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <Typography gutterBottom variant={"h6"}>Sharing: {tabManager.tabs[tabManager.activeTab].shared ? "ON" : "OFF"}</Typography>
        <Box mb={1}>
          {
            tabManager.tabs[tabManager.activeTab].sharedWithUsers.map((username, index) => (
              <Chip
                key={`Chip-${index}`}
                label={username}
                onDelete={() => stopSharingCurrentTab(username)}
              />
            ))
          }
        </Box>
        <TextField
          onChange={handleOnChange}
          value={username}
          autoFocus
          margin={"dense"}
          label={"Username"}
          type={"text"}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={"primary"}>
          Cancel
        </Button>
        <Button onClick={shareTab} color={"primary"}>
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ShareTabDialog;
