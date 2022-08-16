import React, {useState} from "react";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {Typography} from '@material-ui/core'


interface EndpointInstance {
    id: string
    url: string,
    token: string
    removeEndpoint: (params: any) => any
}

export const ViewWidgetEndpoint: React.FC<EndpointInstance> = ({id, url, token, removeEndpoint}) => {
    return(
        <div>
            <Typography>{url}</Typography>
            <Typography>{token}</Typography>
            <Button style={{marginTop:"1.5em"}} onClick={()=>removeEndpoint(id)} ><DeleteIcon style={{cursor:"pointer"}}></DeleteIcon></Button>
        </div>
    )
}
