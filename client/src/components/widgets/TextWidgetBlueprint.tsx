import React, { useContext, useEffect, useState } from "react";
import {
    IconButton,
    makeStyles,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import {TextWidgetBuilder} from "../../models/widgetBuilders/TextWidgetBuilder";


/**
 * Structure of incoming data from the backend.
 * */
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
}


const TextWidgetBlueprint: React.FC<TextWidgetProps> = ({ builder, title, src, appURL }) => {

    const classes = useStyles();
    const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tableData, setTableData] = useState<any[]>([]);


    useEffect(() => {
        fetchQuery().catch((err) => setError("An error occurred. Failed to fetch data from backend server."));
    }, []);
    console.log("received URL: ", appURL)
    const fetchQuery = async () => {
        console.log(src)
        const data = (await axios.get(`${src}`));
        console.log("from TableWidgetBlueprint")
        console.log(data)
        if (data.status === 200) {
            console.log(Object.keys(data.data.data[0]));
            setTableData(data.data.data);
        } else {
            console.log("query error")
            throw new Error("Backend query error.");
        }
        setLoading(false);
    };

    const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

    // const countOk = () => tableData.reduce((ok, data) => data.Status === "Ok" ? ok + 1 : ok, 0);


    if (error) return <WidgetError message={error} onClose={removeWidget}/>;

    if (loading) return <WidgetLoading onClose={removeWidget}/>;

    return (
        <WidgetContainer>
            <WidgetTitleBar title={title} onClose={removeWidget}>
                <IconButton href={appURL} target={"_blank"} color={"inherit"} size={"small"}>
                    <ExitToAppIcon fontSize={"small"}/>
                </IconButton>
            </WidgetTitleBar>

            <WidgetBody>

                <div>
                    {tableData}
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
