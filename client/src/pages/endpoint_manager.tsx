import React, { useContext, useEffect, useState } from "react";
import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    TableFooter, Box, Button, CircularProgress, Container, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import _ from "lodash";
import Image from "next/image";

import Layout from "../components/common/Layout";

import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import { kLocalStoreKey, kStore } from "../utils/constants";
import localStore from "../utils/localStore";
import { useDrawer } from "../utils/hooks/useDrawer";
import defaultLogo from "../../public/defaultLogo.png"
import AddWidgetDialog from "../components/AddWidgetDialog";
import {AuthContext} from "../utils/contexts/AuthContext";

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

interface Endpoint{
    _id:string,
    url: string,
    token: string
}

export default function Widgets() {


    const { isAuthenticated } = useContext(AuthContext);

    const { user, addWidgetEndpoint, deleteWidgetEndpoint, deleteAllWidgetEndpoints, getWidgetEndpoints } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {open, onClose, onOpen} = useDrawer();

    // modal for adding the widget
    const {open: openAddWidget, onClose: onCloseAddWidget, onOpen: onOpenAddWidget} = useDrawer()

    const [searchString, setSearchString] = useState("");
    const [filteredEndpoints, setFilteredEndpoints] = useState<Endpoint[]>([]);
    const [allEndpoints, setAllEndpoints] = useState<Endpoint[]>([]);

    useEffect(() => {
        loadEndpoints().catch((err) => setError(err.message))
    }, []);

    const [filterTable, setFilterTable] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<boolean>(false);
    const [filterFrame, setFilterFrame] = useState<boolean>(false);
    const [savedEndpoints, setSavedEndpoints] = useState<Endpoint[]>([]);

    const loadEndpoints = async() => {
        const savedEndpoints : Endpoint[] | null = await localStore.getItem(kLocalStoreKey.WIDGET_ENDPOINTS)
        if(!savedEndpoints){
            await fetchEndpoints()
            return;
        }
        setFilteredEndpoints(savedEndpoints)
        setAllEndpoints(savedEndpoints);
        setLoading(false)
    }

    const [anchorElTabSettingsMenu, setAnchorTabSettingsMenu] = React.useState<null | HTMLElement>(null);

    const openTabSettingsMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorTabSettingsMenu(event.currentTarget);
    const closeAnchorTabSettingMenu = () => setAnchorTabSettingsMenu(null)

    const fetchEndpoints = async () => {
        setLoading(true);
        const widgetEndpoints : Endpoint[] = await getWidgetEndpoints().catch(e => {
            return [{_id:"0", url: "https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/user-dashboard/GetWidgets/", token:"" } as Endpoint]
        })
        await localStore.setItem(kLocalStoreKey.WIDGET_ENDPOINTS, widgetEndpoints)
        setSearchString("");
        setSavedEndpoints(widgetEndpoints)
        setFilteredEndpoints(widgetEndpoints)
        setAllEndpoints(widgetEndpoints);
        setLoading(false);
    };

    const filterEndpoints = (partialName: string) => {
        const trimmedPartialName = partialName.trim().toLowerCase();
        if (trimmedPartialName.length === 0) {
            setFilteredEndpoints(allEndpoints);
            return;
        }
        setFilteredEndpoints(allEndpoints.filter(widgetEndpoint => widgetEndpoint.url.toLowerCase().includes(trimmedPartialName)));
    };

    const debouncedFilterEndpoints = _.debounce((partialName) => filterEndpoints(partialName), 1000);

    const handleSearchOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        debouncedFilterEndpoints(e.target.value);
    };

    // Add widget dialog
    const addwidgetDialog = () => {
        onOpenAddWidget()
        closeAnchorTabSettingMenu()
    }

    const DeleteAllConfirmationScreenDialog = () => {
        const deleteAll = confirm("WARNING: This will delete all the endpoints for this account. Proceed?")
        if (deleteAll) {
            deleteAllWidgetEndpoints().then(r => alert("Deleted all the endpoints."))
                .catch(e => {
                    // console.log(e)
                    alert("ERROR: could not delete the endpoints")
                })
        }
    }

    // console.log("endpoints: ", filteredEndpoints)

    const tableHeader = [
        { label: "URL", data: "url" },
        // { label: "Token", data: "token" }
    ];

    const deleteEndpoint = async (endpoint: Endpoint) => {
        await deleteWidgetEndpoint(endpoint).then(r => console.log("deleted endpoint")).catch(e => console.log(e))
        const newEndpointArr = savedEndpoints.filter((ep) => {ep._id != endpoint._id})
        setSavedEndpoints(newEndpointArr)
        setFilteredEndpoints(newEndpointArr)
        setAllEndpoints(newEndpointArr)
        fetchEndpoints().then(r => console.log(r)).catch(e => console.log(e))
    }

    if (loading) {
        return (
            <Layout showWidgetToolbar={true}>
                <Container maxWidth={"lg"}>

                    <Box mt={2}>
                        <Typography variant={"h3"} align={"center"}>Endpoint Manager</Typography>
                    </Box>
                    <Box mt={2}>
                        <TextField onChange={handleSearchOnChange} fullWidth size={"small"} label={"Search"} variant={"outlined"}/>
                    </Box>
                    <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Button size={"small"} onClick={addwidgetDialog} disabled={!isAuthenticated()}>Add Widget Endpoint</Button>
                            <Button size={"small"} onClick={fetchEndpoints}>Refresh Endpoints</Button>
                            <Button size={"small"} onClick={DeleteAllConfirmationScreenDialog} disabled={!isAuthenticated()}>Delete All Endpoints</Button>
                        </Box>
                    </Box>
                    <AddWidgetDialog open={openAddWidget} onClose={onCloseAddWidget} callback={fetchEndpoints} endpointsArray={savedEndpoints}/>
                    {/*<ViewWidgetEndpointsDialog open={openViewWidget} onClose={onCloseViewWidget} endpoints={savedEndpoints} />*/}
                    <Box mt={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress/>
                    </Box>

                </Container>
            </Layout>
        );
    }

    return (
        <Layout showWidgetToolbar={true}>
            <Container maxWidth={"lg"}>
                <Box mt={2}>
                    <Typography variant={"h3"} align={"center"}>Endpoint Manager</Typography>
                </Box>

                <Box mt={2}>
                    <TextField onChange={handleSearchOnChange} fullWidth size={"small"} label={"Search"} variant={"outlined"}/>
                </Box>

                <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box mt={2} display={"flex"} marginTop={"0px"} justifyContent={"space-between"} alignItems={"center"}>
                        <Button size={"small"} onClick={addwidgetDialog} disabled={!isAuthenticated()}>Add Widget Endpoint</Button>
                        <Button size={"small"} onClick={fetchEndpoints}>Refresh Endpoints</Button>
                        <Button size={"small"} onClick={DeleteAllConfirmationScreenDialog} disabled={!isAuthenticated()}>Delete All Endpoints</Button>
                    </Box>
                </Box>
                <AddWidgetDialog open={openAddWidget} onClose={onCloseAddWidget} callback={fetchEndpoints} endpointsArray={savedEndpoints} />
                {/*<ViewWidgetEndpointsDialog open={openViewWidget} onClose={onCloseViewWidget} endpoints={savedEndpoints}/>*/}
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {tableHeader.map((cell) => (
                                            <TableCell key={cell.data}>
                                                {cell.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                   filteredEndpoints.map(endpoint => {
                                      return(
                                      <TableRow key={endpoint._id}>
                                           <EndpointInstance url={endpoint.url} token={endpoint.token} />
                                          { isAuthenticated() && <Button style={{marginTop:"0em"}} onClick={()=>deleteEndpoint(endpoint)} ><DeleteIcon style={{cursor:"pointer"}}></DeleteIcon></Button> }
                                       </TableRow>
                                      )
                                   })
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Box>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={1000}
                    onClose={onClose}
                    message={`Widget added to the dashboard.`}
                />
            </Container>
        </Layout>
    );
}

interface selectionButtonProps {
    widgetName: string
}

const SelectionButton: React.FC<selectionButtonProps> = ({widgetName}) => {
    return (<Button>{widgetName}</Button>)
}


interface WidgetBrowserItemProps {
    showImages: boolean;
    thumbnail: string;
    title: string;
    onClick: (event: React.MouseEvent) => void
}

interface EndpointInstanceProps {
    url: string
    token: string
}

const EndpointInstance: React.FC<EndpointInstanceProps> = ({url, token}) => {
    const [showToken, setShowToken] = useState(false);
    const tokenToShow = showToken ? token : (token.length!==0 ? '*'.repeat(token.length+9) : '')
    return(
        <>
            <TableCell><Typography>{url}</Typography></TableCell>
            {/*<TableCell><Typography>{tokenToShow}</Typography></TableCell>*/}
            {/*{!showToken && <Button onClick={() => setShowToken(!showToken)}><VisibilityIcon></VisibilityIcon></Button>}*/}
            {/*{showToken && <Button onClick={() => setShowToken(!showToken)}><VisibilityOffIcon></VisibilityOffIcon></Button>}*/}
        </>
    )
}


const WidgetBrowserItem: React.FC<WidgetBrowserItemProps> = ({ showImages, thumbnail, title, onClick }) => {
    return (
        <Box bgcolor={"secondary.light"} p={1}>
            <Box>
                {
                    showImages && (
                        <Image
                            src={thumbnail}
                            alt={"Widget thumbnail"}
                            width={512}
                            height={256}
                        />
                    )
                }
            </Box>
            <Box>
                <Typography variant={"body1"} align={"center"}>{title}</Typography>
                <Box pt={1}>
                    <Button
                        onClick={onClick}
                        size={"small"}
                        variant={"contained"}
                        fullWidth
                        disableElevation
                    >
                        Add to Dashboard
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};