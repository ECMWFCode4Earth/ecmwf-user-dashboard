import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";


interface RenameTabDialogProps {
  open: boolean;
  onClose: () => void;
}


const RenameTabDialog: React.FC<RenameTabDialogProps> = ({ open, onClose }) => {

  const { tabManager, renameCurrentTab } = useContext(TabManagerContext);
  const [name, setName] = useState("");


  useEffect(() => {
    setName(tabManager.tabs[tabManager.activeTab].name);
  }, [open]);


  const renameTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    renameCurrentTab(name);
    onClose();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <TextField
          onChange={handleOnChange}
          value={name}
          autoFocus
          margin={"dense"}
          label={"Tab Name"}
          type={"text"}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={"primary"}>
          Cancel
        </Button>
        <Button onClick={renameTab} color={"primary"}>
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default RenameTabDialog;
