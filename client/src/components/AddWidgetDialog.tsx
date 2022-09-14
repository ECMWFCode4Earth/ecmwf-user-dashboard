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
import defaultLogo from "../../public/defaultLogo.png"
import {log} from "util";
import localStore from "../utils/localStore";
import {kLocalStoreKey} from "../utils/constants";

interface WidgetDetail {
    title: string;
    name: string;
    thumbnail: string;
    href: string;
    type: string;
    appURL: string;
    authRequired: boolean;
    token: string;
}

interface AddWidgetDialogProps {
    open: boolean;
    onClose: () => void;
    callback: (e: Endpoint) => void;
    endpointsArray: Endpoint[]
}

interface Endpoint{
    _id: string,
    url: string,
    token: string
}

const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({ open, onClose, callback, endpointsArray }) => {

    const { user, addWidgetEndpoint, deleteWidgetEndpoint, deleteAllWidgetEndpoints, getWidgetEndpoints } = useContext(AuthContext);
    const [url, setUrl] = useState("");
    const [tick, setTick] = useState(false);
    const [token, setToken] = useState("");
    const [endpointArray, setEndpointArray] = useState<Endpoint[]>([]);

    const [openSnack, setOpenSnack] = useState(false);
    const [openMessage, setOpenMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
        setLoading(true)
        e.url = e.url.trim()
        if(e.url.length == 0){
            setOpenMessage("url can't be empty")
            setOpenSnack(true)
            setUrl("")
            setLoading(false)
            setToken("")
            return;
        }
        const res = endpointsArray.find((ep:Endpoint) => {
            return ep.url == e.url && ep.token == e.token
        })

        if (res){
            setOpenMessage("url with specified token already exists!!")
            setOpenSnack(true)
            setLoading(false)
            return
        }
        // try making a call to the endpoint and see if it returns anything
        const headers_in_request = token.length != 0 ? {'X-Auth': e.token} : {}
        try {
            const try_request = await axios.get(e.url, {
                headers: headers_in_request
            })
            setLoading(false)
            setTick(true)
        }
        catch (e: any){
            setOpenMessage("Invalid credentials, retry again!!")
            setOpenSnack(true)
            setLoading(false)
        }
    }
    const saveEndpoint = (e: Endpoint) => {
        if(e.url != '') {
            e.url = e.url.trim()
            addWidgetEndpoint(e).then(res => {
                console.log("success adding the endpoint. Res: ", res)
                setOpenMessage("success adding the endpoint.")
                //make a call to getWidgetEndpoint
                callback(e)
                setOpenSnack(true)
                setUrl("")
                setToken("")
                setTimeout(() => {
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
        setTick(false)
        setLoading(false)
    }
    const handleUrlChange= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUrl(e.target.value)  ;
    };
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToken(e.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);


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
                <Button disabled={tick || loading} onClick={() => {verifyEndpoint({_id:'0', url, token})}} color={"primary"}>
                    {!tick && !loading &&
                        <Button color={"primary"}>
                        Verify
                        </Button>
                    }
                    {loading && <CircularProgress size={'1.5rem'}/>}
                    {tick && <CheckIcon style={{color:'green'}}/>}
                </Button>
                <Button disabled={!tick} onClick={() => {saveEndpoint({_id:'0', url, token}) }} color={"primary"}>
                    Save
                </Button>
                <Button onClick={()=>{onClose(); setToken(""); setUrl(""); setTick(false); setLoading(false)}} color={"primary"}>
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
