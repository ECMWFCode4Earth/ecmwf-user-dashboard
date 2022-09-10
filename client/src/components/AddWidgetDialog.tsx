import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField,
    Input,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    CircularProgress
} from "@material-ui/core";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import {AuthContext} from "../utils/contexts/AuthContext";
import * as Url from "url";
import DoneIcon from '@material-ui/icons/Done';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import {AddEndpointInstance} from "./AddEndpointInstance";
import axios from "axios"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import {log} from "util";

interface AddWidgetDialogProps {
    open: boolean;
    onClose: () => void;
    callback: () => void;
}

interface Endpoint{
    url: string,
    token: string
}

const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({ open, onClose, callback }) => {

    const { user, addWidgetEndpoints, deleteWidgetEndpoint, deleteAllWidgetEndpoints, getWidgetEndpoints } = useContext(AuthContext);
    const [url, setUrl] = useState("");
    const [tick, setTick] = useState(false);
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
        setTick(false)
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

    const verifyEndpoint = async (e: Endpoint) => {
        if(e.url.trim().length == 0){
            setOpenMessage("url can't be empty")
            setOpenSnack(true)
            setUrl("")
            return;
        }
        // try making a call to the endpoint and see if it returns anything
        const headers_in_request = token.length != 0 ? {'X-Auth': e.token} : {}
        try {
            const try_request = await axios.get(e.url, {
                headers: headers_in_request
            })
            setTick(true)
            setLoading(false)
        }
        catch (e: any){
            setOpenMessage("Invalid credentials, retry again!!")
            setOpenSnack(true)
        }
    }
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
                callback()
            }).catch(err => {
                console.log(err)
                setOpenMessage("Could not add the endpoint.")
                setOpenSnack(true)
            })
        }else{
            setOpenMessage("url can't be empty!")
            setOpenSnack(true)
        }
        setTick(false)
    }
    const handleUrlChange= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUrl(e.target.value)  ;
    };
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToken(e.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    // @ts-ignore
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true}>
            <DialogContent>
                <DialogTitle style={{margin:"auto", textAlign:"center"}}>URL Endpoints Manager</DialogTitle>
                <TextField
                    onChange={handleUrlChange}
                    value={url}
                    autoFocus
                    label={"URL"}
                    type={"text"}
                    required={true}
                    fullWidth
                />
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="filled-adornment-password" style={{marginLeft:"-0.7em"}}>Token</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={token}
                        onChange={handleTokenChange}
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
                {/*{(() => {*/}
                {/*    for (let i = 0; i < noc; i++) {*/}
                {/*        <AddEndpointInstance addEndpointHandler={addEndpoint} removeEndpointHandler={removeEndpoint} />*/}
                {/*    }*/}
                {/*})}*/}
                {/*    <AddEndpointInstance addEndpointHandler={addEndpoint} removeEndpointHandler={removeEndpoint}/>*/}
            </DialogContent>
            <DialogActions>
                {/*<Button onClick={() => setNoc(noc+1)}><AddIcon/></Button>*/}
                <Button onClick={() => {verifyEndpoint({url, token}); setLoading(true)}} color={"primary"}>
                    {!tick && !loading && <p>Verify</p>}
                    {loading && <CircularProgress />}
                    {tick && <CheckIcon style={{color:'green'}}/>}
                </Button>
                <Button disabled={!tick} onClick={() => {saveEndpoint({url, token}) }} color={"primary"}>
                    Save
                </Button>
                <Button onClick={()=>{onClose(); setToken(""); setUrl(""); setTick(false)}} color={"primary"}>
                    Cancel
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
