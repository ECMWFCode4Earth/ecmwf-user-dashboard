import React, { useContext, useEffect, useState } from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField} from "@material-ui/core";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import {AuthContext} from "../utils/contexts/AuthContext";
import * as Url from "url";
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import {AddEndpointInstance} from "./AddEndpointInstance";
import {log} from "util";

interface AddWidgetDialogProps {
    open: boolean;
    onClose: () => void;
}

interface Endpoint{
    url: string,
    token: string
}

const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({ open, onClose }) => {

    const { user, addWidgetEndpoints, deleteWidgetEndpoint, deleteAllWidgetEndpoints, getWidgetEndpoints } = useContext(AuthContext);
    const [url, setUrl] = useState("");
    const [token, setToken] = useState("");
    const [endpointArray, setEndpointArray] = useState<Endpoint[]>([]);
    const callBackLogger = () => {
        console.log("endpointArray: ", endpointArray)
    }

    const [openSnack, setOpenSnack] = useState(false);
    const [openMessage, setOpenMessage] = useState("");

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const [noc, setNoc] = useState<number>(1);
    const addEndpoint = async (ep : Endpoint) => {
        console.log("received the request")
        if(ep.url!=''){
            console.log("ep: ", ep)
            await setEndpointArray(endpointArray => ([...endpointArray, ep]))
        }
        else{
            console.log("url can't be empty")
        }
    }
    const removeEndpoint = async (ep: Endpoint) => {
        await setEndpointArray(endpointArray => endpointArray.filter(epa=> (epa.url!=ep.url && epa.token != ep.token)))
        console.log(endpointArray)
    }
    // useEffect(() => {
    //     setName(tabManager.tabs[tabManager.activeTab].name);
    // }, [open]);
    //
    //
    // const renameTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     renameCurrentTab(name);
    //     onClose();
    // };
    //
    const saveEndpoint = (e: Endpoint) => {
        if(e.url != '') {
            addWidgetEndpoints([e]).then(res => {
                console.log("success adding the endpoint. Res: ", res)
                setOpenMessage("success adding the endpoint.")
                setOpenSnack(true)
                setUrl("")
                setToken("")
                setTimeout(()=>{
                    onClose()
                }, 1700)
            }).catch(err => {
                console.log(err)
                setOpenMessage("Could not add the endpoint.")
                setOpenSnack(true)
            })
        }else{
            setOpenMessage("url can't be empty!")
            setOpenSnack(true)
        }
    }
    const handleUrlChange= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUrl(e.target.value);
    };
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToken(e.target.value);
    };

    // @ts-ignore
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true}>
            <DialogContent>
                <DialogTitle style={{margin:"auto", textAlign:"center"}}>URL Endpoints Manager</DialogTitle>
                <TextField
                    onChange={handleUrlChange}
                    value={url}
                    autoFocus
                    style={{margin:"1em"}}
                    label={"URL"}
                    type={"text"}
                    required={true}

                />
                <TextField
                    onChange={handleTokenChange}
                    value={token}
                    style={{margin:"1em"}}
                    label={"Token"}
                    type={"text"}
                />
                {/*{(() => {*/}
                {/*    for (let i = 0; i < noc; i++) {*/}
                {/*        <AddEndpointInstance addEndpointHandler={addEndpoint} removeEndpointHandler={removeEndpoint} />*/}
                {/*    }*/}
                {/*})}*/}
                {/*    <AddEndpointInstance addEndpointHandler={addEndpoint} removeEndpointHandler={removeEndpoint}/>*/}
            </DialogContent>
            <DialogActions>
                {/*<Button onClick={() => setNoc(noc+1)}><AddIcon/></Button>*/}
                <Button onClick={()=>{onClose(); setToken(""); setUrl("")}} color={"primary"}>
                    Cancel
                </Button>
                <Button onClick={() => {saveEndpoint({url, token})}} color={"primary"}>
                    Save
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={openSnack}
                    autoHideDuration={1500}
                    onClose={handleClose}
                    message={openMessage}
                />
            </DialogActions>
        </Dialog>
    );
};


export default AddWidgetDialog;

interface AddEndpointInstanceProps{
    addEndpoint : (params: Endpoint) => any;
    removeEndpoint: (params: Endpoint) => any;
}

const addComponent = ({addEndpoint, removeEndpoint}: AddEndpointInstanceProps) => {
    console.log("request to add instance received")
    return(
        <AddEndpointInstance addEndpointHandler={addEndpoint} removeEndpointHandler={removeEndpoint} />
    )
}
