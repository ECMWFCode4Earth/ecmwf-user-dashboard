import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

interface Endpoint{
    _id: string,
    url: string,
    token: string
}

interface AddEndpointInstanceProps{
    addEndpointHandler : (params: Endpoint) => any;
    removeEndpointHandler: (params: Endpoint) => any;
}

export const AddEndpointInstance = ({addEndpointHandler, removeEndpointHandler}:AddEndpointInstanceProps) => {
    const [url, setUrl] = useState("");
    const [token, setToken] = useState("");

    // const handleClick = () => {
    //     endpoint.push({url, token})
    //     console.log(endpoint)
    // }

    // const handleDelete = () => {
    //     endpoint = endpoint.filter(ep => (ep.url != url && ep.token!=token)) as any
    //     !open
    // }

    const handleUrlChange= (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUrl(e.target.value);
    };
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setToken(e.target.value);
    };

    return(
        <div>
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
            {/*<Button style={{marginTop:"1.5em"}} onClick={()=> {*/}
            {/*    addEndpointHandler({url, token})*/}
            {/*}}><DoneIcon  style={{cursor:"pointer"}}></DoneIcon></Button>*/}
            {/*<Button style={{marginTop:"1.5em"}} onClick={()=>{ setToken(""); setUrl("");removeEndpointHandler({url, token})}} ><DeleteIcon style={{cursor:"pointer"}}></DeleteIcon></Button>*/}

        </div>
    )
}