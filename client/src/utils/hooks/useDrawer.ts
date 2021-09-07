import {useState} from "react";


/**
 * Utility hook to be used with Drawers.
 * */

export const useDrawer = (onOpen?: Function, onClose?: Function) => {

    const [open, setOpen] = useState<boolean>(false);

    return {
        open,
        onOpen: () => {
            onOpen && onOpen();
            setOpen(true);
        },
        onClose: () => {
            onClose && onClose();
            setOpen(false);
        }
    }

}
