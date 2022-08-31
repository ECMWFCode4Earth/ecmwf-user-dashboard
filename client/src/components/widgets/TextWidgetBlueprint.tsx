import React, {useContext, useEffect, useState} from "react";
import {IconButton, makeStyles,} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import {TabManagerContext} from "../../utils/contexts/TabManagerContext";
import {TextWidgetBuilder} from "../../models/widgetBuilders/TextWidgetBuilder";
import Markdown from 'markdown-to-jsx'
import {RefreshRounded} from "@material-ui/icons";


// TODO: modify according to the markdown conversion needs
interface TableDataDetails {
    Title: string,
    Status: string,
}


interface TextWidgetProps {
    builder: TextWidgetBuilder;
    title: string;
    src: string;
    appURL: string;
    authRequired: boolean;
    token : string;
}


const TextWidgetBlueprint: React.FC<TextWidgetProps> = ({ builder, title, src, appURL, authRequired, token }) => {

    const classes = useStyles();
    const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tableData, setTableData] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            console.log("AuthRequired: ",authRequired)
            console.log("token: ", token)
            const headers_in_request = token.length!=0 ? { 'X-Auth' : token} : {}
            console.log("reached textwidget")
            let data : any = {}
            try {
                data = await axios.get(src, {
                    headers: headers_in_request
                })
            }
            catch(e: any){
                console.log("could not load data for ")
            }
            console.log("from TextWidgetBlueprint")
            console.log(data)
            if (data.status === 200) {
                console.log(Object.keys(data.data.data[0]));
                setTableData(data.data.data);
            } else {
                console.log("query error")
                throw new Error("Backend query error.");
            }
            setLoading(false);
        }
        fetchData().catch((err) => setError("An error occurred. Failed to fetch data from backend server."));
    }, [refresh]);



    const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);


    if (error) return <WidgetError message={error} onClose={removeWidget}/>;

    if (loading) return <WidgetLoading onClose={removeWidget}/>;

    return (
        <WidgetContainer>
            <WidgetTitleBar title={title} onClose={removeWidget}>
                <IconButton href={appURL} target={"_blank"} color={"inherit"} size={"small"}>
                    <ExitToAppIcon fontSize={"small"}/>
                </IconButton>
                <IconButton style={{color:"white"}} onClick={()=> {
                    setRefresh(!refresh)
                    setLoading(true)
                }}>
                    <RefreshRounded></RefreshRounded>
                </IconButton>
            </WidgetTitleBar>

            <WidgetBody>

                <div style={{margin: "auto", padding:"1em"}}>
                    <Markdown >{tableData}</Markdown>
                </div>

            </WidgetBody>

        </WidgetContainer>
    );

};


const useStyles = makeStyles(
    (theme) => (
        {
            cellOk: {
                color: theme.palette.success.dark,
                fontWeight: "bold"
            },
            cellNotOk: {
                color: theme.palette.error.main,
            },
            rowOk: {
                cursor: "pointer",
            },
            rowNotOk: {
                // backgroundColor: theme.palette.error.light,
                cursor: "pointer",
                "&:hover": {
                    // backgroundColor: theme.palette.error.main,
                }
            }
        }
    )
);


export default TextWidgetBlueprint;
