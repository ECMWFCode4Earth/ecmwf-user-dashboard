import React, { useContext, useEffect, useState } from "react";
import {
    IconButton,
    makeStyles,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import {TableWidgetBuilder} from "../../models/widgetBuilders/TableWidgetBuilder";
import {RefreshRounded} from "@material-ui/icons";


/**
 * Structure of incoming data from the backend.
 * */
interface TableDataDetails {
    Title: string,
    Status: string,
}


interface TableDataWidgetProps {
    builder: TableWidgetBuilder;
    title: string;
    src: string;
    appURL: string;
    authRequired: boolean;
    token: string;
}


const TableDataWidgetBlueprint: React.FC<TableDataWidgetProps> = ({ builder, title, src, appURL , authRequired, token}) => {

    const classes = useStyles();
    const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tableData, setTableData] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [columnHead, setColumnHead] = useState<string[]>([]);
    const [style, setStyle] = useState<Record<string, string>>({});

    console.log("token:", token)
    useEffect(() => {
        console.log("in-app-src: ", src)
        const fetchData = async () => {
            console.log("AuthRequired from table: ",authRequired)

            const headers_in_request = token.length!=0 ? { 'X-Auth' : token} : {}

            const data = await axios.get(src,{
                headers: headers_in_request
            })
            console.log("from TableWidgetBlueprint")
            console.log(data)

            //fixing the styling first....
            // data->data->styling
            //TODO: ask for the data like the previous format except the keywords
            //getting the columns first
            const cols = data.data.styling.columns;
            console.log("cols: ", cols)

            const colHeadTemp : string[] = [];
            const styleTemp: Record<string,  string> = {};
            const tempObj = [];

            //cols is an array
            for(let i=0; i<cols.length; i++){
                colHeadTemp.push(cols[i].title)
                // let obj = _.cloneDeep(cols[i]);
                tempObj.push(Object.entries(cols[i]));
                // let obj = cols[i];
            }
            console.log("tempObj: ", tempObj)
            // tempObj.forEach((obj:any) => {
            //     styleTemp[obj.key] = obj?.color
            // })
            //TODO: see if I can make it more column specific
            tempObj.forEach((somearr:any) => {
                for (let i=0; i<somearr.length; i++){
                    const tempRecord : Record<number, string> = {};
                    tempRecord[i] = somearr[i][1].colour === undefined ? 'white' : somearr[i][1].colour
                    styleTemp[somearr[i][0]] = tempRecord[i]//somearr[i][1].colour === undefined ? {i : 'black'} : {i: somearr[i][1].colour as string};
                    console.log("temprecord: ", tempRecord[i])
                }

                /*somearr.map((nested:any, index:number)=>{
                    console.log("nested: ", nested, "index: ", index )
                    styleTemp[nested[0]] = nested[1].colour === undefined ? {index:'black'} : {index: nested[1].colour as string}
                })*/
                // styleTemp[somearr[0]] = styleTemp[somearr[1]?.color]
                // console.log("key: ", somearr[0], " val: ", styleTemp[somearr[0]])
            })
            console.log("styleTemp",styleTemp);



            setColumnHead(colHeadTemp)
            setStyle(styleTemp)
            console.log("from TableWidgetBlueprint")

            if (data.status === 200) {
                console.log(Object.keys(data.data.data[0]));
                console.log("Table data: ",data.data.data)
                const dataToRender = data.data.data;
                const obj:any[] = []
                for(let i=0; i<dataToRender[0].length; i++){
                    const tempObj = [];
                    for(let j=0; j<dataToRender.length; j++){
                        tempObj.push(dataToRender[j][i]);
                    }
                    obj.push(tempObj);
                }
                console.log("object:",obj)
                setTableData(obj);
            } else {
                console.log("query error")
                throw new Error("Backend query error.");
            }
            setLoading(false);
        }
        fetchData().catch((err) => setError(err));
    }, [refresh]);


    const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

    if (error) return <WidgetError message={error} onClose={removeWidget}/>;

    if (loading) return <WidgetLoading onClose={removeWidget}/>;
    console.log("columnHead: ", columnHead)
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

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columnHead.map((key, index) => {
                                    return (
                                        <TableCell key={index}>
                                            {key.toUpperCase()}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {tableData.map(
                            (data, index) => {
                                return (
                                    <TableRow key={index}>
                                        {data.map((key:any, index:number)=>{
                                            //style[key] !== undefined ? style[key][index] : 'black'
                                            // console.log("style[key][index]: ", style[key][index])
                                            return (<TableCell key={key} >
                                              <div style={{ borderRadius: "0.1rem",padding: "0.5em" ,display: "flex", alignItems:"center", justifyContent: "center", background:style[key]!== undefined ? style[key] : 'white', color: style[key]!== undefined ? 'white': 'black'}}>{key}</div>
                                            </TableCell>)
                                        })}
                                        {/*{Object.values(data).map((key:any) => {
                                            return (<TableCell key={key}>
                                                {key}
                                            </TableCell>)
                                        })}*/}
                                    </TableRow>
                                );
                            }
                        )}
                        </TableBody>

                    </Table>
                </TableContainer>

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


export default TableDataWidgetBlueprint;
