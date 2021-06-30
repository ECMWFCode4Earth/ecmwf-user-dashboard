import {useState} from "react";

export const useDrawer = (onOpen: Function, onClose: Function) => {

    const [open, setOpen] = useState<boolean>(false);

    return {
        open, 
        onOpen: () => {
            onOpen();
            setOpen(true);
        },
        onClose: () => {
            onClose();
            setOpen(false);
        }
    }

}