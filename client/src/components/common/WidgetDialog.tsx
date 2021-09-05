import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";


interface WidgetDialogProps {
  title?: string;
  open: boolean;
  onClose: () => void;
}


const WidgetDialog: React.FC<WidgetDialogProps> = ({ children, title, open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"md"}
      // TransitionComponent={Transition}
    >
      {title && (
        <DialogTitle>
          Instruments
        </DialogTitle>
      )}
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={"primary"}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction={"up"} ref={ref} {...props} />;
});


export default WidgetDialog;
