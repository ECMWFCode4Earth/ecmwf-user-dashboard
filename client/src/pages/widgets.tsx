import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import axios from "axios";
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
import ViewWidgetEndpointsDialog from "../components/ViewWidgetEndpointsDialog";


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

    const { user, addWidgetEndpoints, deleteWidgetEndpoint, deleteAllWidgetEndpoints, getWidgetEndpoints } = useContext(AuthContext);
    const { addNewWidgetFromBrowserToCurrentTab } = useContext(TabManagerContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {open, onClose, onOpen} = useDrawer();

    // modal for adding the widget
    const {open: openAddWidget, onClose: onCloseAddWidget, onOpen: onOpenAddWidget} = useDrawer()
    const {open: openViewWidget, onClose: onCloseViewWidget, onOpen: onOpenViewWidget} = useDrawer()

    const [searchString, setSearchString] = useState("");
    const [showImages, setShowImages] = useState(false);
    const [filteredWidgetDetails, setFilteredWidgetDetails] = useState<WidgetDetail[]>([]);
    const [allWidgetDetails, setAllWidgetDetails] = useState<WidgetDetail[]>([]);

    const specificWidgets : Record<string, WidgetDetail[]> = {};
    const [widgetTypes, setWidgetTypes] = useState<string[]>([]);
    useEffect(() => {
        loadWidgetDetails().catch((err) => setError(err.message));
    }, []);
    useEffect(() => {
        loadEndpoints().catch((err) => setError(err.message))
    }, []);

    const [filterTable, setFilterTable] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<boolean>(false);
    const [filterFrame, setFilterFrame] = useState<boolean>(false);
    const [savedEndpoints, setSavedEndpoints] = useState<Endpoint[]>([]);

    const loadWidgetDetails = async () => {
        const savedWidgetDetails: WidgetDetail[] | null = await localStore.getItem(kLocalStoreKey.WIDGET_DETAILS);
        if (!savedWidgetDetails) {
            await fetchWidgetDetails();
            return;
        }
        setAllWidgetDetails(savedWidgetDetails);
        setFilteredWidgetDetails(savedWidgetDetails);
        setLoading(false);
    };

    const loadEndpoints = async() => {
        const savedEndpoints : Endpoint[] | null = await localStore.getItem(kLocalStoreKey.WIDGET_ENDPOINTS)
        if(!savedEndpoints){
            await fetchWidgetDetails()
            return;
        }
        setSavedEndpoints(savedEndpoints)
    }

    const [anchorElTabSettingsMenu, setAnchorTabSettingsMenu] = React.useState<null | HTMLElement>(null);

    const openTabSettingsMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorTabSettingsMenu(event.currentTarget);
    const closeAnchorTabSettingMenu = () => setAnchorTabSettingsMenu(null)

// TODO: title and name are same in widgets data that we get from this file's api query

    const fetchWidgetDetails = async () => {
        setLoading(true);
        const widgetDetails:WidgetDetail[] = [];
        const tempWidgetTypes: string[] = [];
        const widgetEndpoints : Endpoint[] = await getWidgetEndpoints()
        console.log("widgetEndpoints: ", widgetEndpoints)
        for (const {url, token} of widgetEndpoints){
            // if (url=="https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/user-dashboard/GetWidgets/")
            //     continue
            const headers_in_request = token.length == 0 ? {} : { 'X-Auth' : token}

            const res = await axios.get(url, {
                        headers:headers_in_request
            });
            const authRequired = token.length != 0
            console.log("token: ", token)
            const widgets = res.data.widgets;
            console.log("tokens from widget: ", token)
            widgets.forEach((widget: any) => {
                widgetDetails.push({
                    title: widget.name,
                    name: widget.name,
                    thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
                    href: widget.href,
                    type: widget["widget-type"],
                    appURL: !("application_url" in widget) ? '#' : widget.application_url,
                    authRequired: authRequired,
                    token: token
                })
                if (specificWidgets[widget["widget-type"]] === undefined) {
                    specificWidgets[widget["widget-type"]] = []
                    tempWidgetTypes.push(widget['widget-type'])
                }
                console.log(tempWidgetTypes)
                specificWidgets[widget["widget-type"]].push({
                    title: widget.name,
                    name: widget.name,
                    thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
                    href: widget.href,
                    type: widget["widget-type"],
                    appURL: !("application_url" in widget) ? '#' : widget.application_url,
                    authRequired: authRequired,
                    token: token
                })

            });
        }
        // const noAuthEndpoints = [`https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/user-dashboard/GetWidgets/`,]
        // const authorisedEndpoints = ['https://apps-dev.ecmwf.int/webapps/openifs-api/v1/get-widgets/']
        // for (const url of noAuthEndpoints) {
        //     const res = await axios.get(url);
        //     console.log("<-----------------Result of API call---------------------->")
        //     console.log(res)
        //     console.log(res.data)
        //     const widgets = res.data.widgets;
        //
        //     widgets.forEach((widget: any) => {
        //         widgetDetails.push({
        //             title: widget.name,
        //             name: widget.name,
        //             thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
        //             href: widget.href,
        //             type: widget["widget-type"],
        //             appURL: !("application_url" in widget) ? '#' : widget.application_url,
        //             authRequired: false
        //         })
        //         if (specificWidgets[widget["widget-type"]] === undefined) {
        //             specificWidgets[widget["widget-type"]] = []
        //             tempWidgetTypes.push(widget['widget-type'])
        //         }
        //         console.log(tempWidgetTypes)
        //         specificWidgets[widget["widget-type"]].push({
        //             title: widget.name,
        //             name: widget.name,
        //             thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
        //             href: widget.href,
        //             type: widget["widget-type"],
        //             appURL: !("application_url" in widget) ? '#' : widget.application_url,
        //             authRequired: false
        //         })
        //
        //     });
        // }
        // for (const url of authorisedEndpoints) {
        //     const res = await axios.get(url, {
        //         headers:{
        //             "Access-Control-Allow-Origin": "*",
        //             'X-Auth': process.env.NEXT_PUBLIC_X_AUTH_TOKEN
        //         }
        //     });
        //     console.log("<-----------------Result of API call---------------------->")
        //     console.log(res)
        //     console.log(res.data)
        //     const widgets = res.data.widgets;
        //
        //     widgets.forEach((widget: any) => {
        //         widgetDetails.push({
        //             title: widget.name,
        //             name: widget.name,
        //             thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
        //             href: widget.href,
        //             type: widget["widget-type"],
        //             appURL: !("application_url" in widget) ? '#' : widget.application_url,
        //             authRequired: true
        //         })
        //         if (specificWidgets[widget["widget-type"]] === undefined) {
        //             specificWidgets[widget["widget-type"]] = []
        //             tempWidgetTypes.push(widget['widget-type'])
        //         }
        //         console.log(tempWidgetTypes)
        //         specificWidgets[widget["widget-type"]].push({
        //             title: widget.name,
        //             name: widget.name,
        //             thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
        //             href: widget.href,
        //             type: widget["widget-type"],
        //             appURL: !("application_url" in widget) ? '#' : widget.application_url,
        //             authRequired: true
        //         })
        //
        //     });
        // }
        console.log("widgetTypes: ", widgetTypes)
        console.log("specificWidgets: ",specificWidgets)
        await localStore.setItem(kLocalStoreKey.WIDGET_DETAILS, widgetDetails);
        await localStore.setItem(kLocalStoreKey.WIDGET_ENDPOINTS, widgetEndpoints)
        setSearchString("");
        setSavedEndpoints(widgetEndpoints)
        setFilteredWidgetDetails(widgetDetails);
        setAllWidgetDetails(widgetDetails);
        console.log("widgetEndpoints: ",widgetDetails)
        setLoading(false);
        setWidgetTypes(tempWidgetTypes)
    };


    const addWidget = (widgetDetail:WidgetDetail) => {
        console.log("from add widget button: ",widgetDetail.token)
        onClose();
        addNewWidgetFromBrowserToCurrentTab(widgetDetail.type, widgetDetail.title, widgetDetail.name, widgetDetail.href, widgetDetail.appURL, widgetDetail.authRequired, widgetDetail.token);
        onOpen();
    };

    const toggleShowImages = () => {
        setShowImages(showImages => !showImages);
    };

    const filterWidgets = (partialName: string) => {
        const trimmedPartialName = partialName.trim().toLowerCase();
        if (trimmedPartialName.length === 0) {
            setFilteredWidgetDetails(allWidgetDetails);
            return;
        }
        setFilteredWidgetDetails(allWidgetDetails.filter(widgetDetail => widgetDetail.title.toLowerCase().includes(trimmedPartialName)));
    };

    const debouncedFilterWidgets = _.debounce((partialName) => filterWidgets(partialName), 1000);

    const handleSearchOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        debouncedFilterWidgets(e.target.value);
    };

    // Add widget dialog
    const addwidgetDialog = () => {
        onOpenAddWidget()
        closeAnchorTabSettingMenu()
    }

    const viewWidgetDialog = () => {
        onOpenViewWidget()
        closeAnchorTabSettingMenu()
    }

    console.log("widgetTypes: ", widgetTypes)
    if (loading) {
        return (
            <Layout showWidgetToolbar={true}>
                <Container maxWidth={"lg"}>

                    <Box mt={2}>
                        <Typography variant={"h3"} align={"center"}>Widget Browser</Typography>
                    </Box>
                    <Box mt={2}>
                        <TextField onChange={handleSearchOnChange} fullWidth size={"small"} label={"Search"} variant={"outlined"}/>
                    </Box>
                    <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Button size={"small"} onClick={toggleShowImages}>Turn {showImages ? "Off" : "On"} Images</Button>
                        <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            {/*<AddWidgetDialog open={openAddWidget} onClose={onCloseAddWidget}/>*/}
                            <Button size={"small"} onClick={viewWidgetDialog}>View Widget Endpoints</Button>
                            <Button size={"small"} onClick={addwidgetDialog}>Add Widget Endpoint</Button>
                            <Button size={"small"} onClick={fetchWidgetDetails}>Refresh Widgets</Button>
                        </Box>
                    </Box>
                    <AddWidgetDialog open={openAddWidget} onClose={onCloseAddWidget} />
                    <ViewWidgetEndpointsDialog open={openViewWidget} onClose={onCloseViewWidget} endpoints={savedEndpoints} />
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
                    <Typography variant={"h3"} align={"center"}>Widget Browser</Typography>
                </Box>

                <Box mt={2}>
                    <TextField onChange={handleSearchOnChange} fullWidth size={"small"} label={"Search"} variant={"outlined"}/>
                </Box>

                <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Button size={"small"} onClick={toggleShowImages}>Turn {showImages ? "Off" : "On"} Images</Button>
                    <Box mt={2} display={"flex"} marginTop={"0px"} justifyContent={"space-between"} alignItems={"center"}>
                        {/*<AddWidgetDialog open={openAddWidget} onClose={onCloseAddWidget}/>*/}
                        <Button size={"small"} onClick={viewWidgetDialog}>View Widget Endpoints</Button>
                         <Button size={"small"} onClick={addwidgetDialog}>Add Widget Endpoint</Button>
                        <Button size={"small"} onClick={fetchWidgetDetails}>Refresh Widgets</Button>
                    </Box>
                </Box>
                <AddWidgetDialog open={openAddWidget} onClose={onCloseAddWidget} />
                <ViewWidgetEndpointsDialog open={openViewWidget} onClose={onCloseViewWidget} endpoints={savedEndpoints}/>

                {/*<Box mt={2}>*/}
                {/*    <Typography>Filters</Typography>*/}
                {/*    <Box>*/}
                {/*    <Grid style={{color:"black"}} container spacing={2}>*/}
                {/*        {*/}
                {/*            widgetTypes.map((widgetName:string, index)=>{*/}
                {/*                console.log("widgetName: ",widgetName)*/}
                {/*                return (*/}
                {/*                    <Grid key={index} item>*/}
                {/*                       <button>{widgetName.toUpperCase()}</button>*/}
                {/*                    </Grid>*/}
                {/*                )*/}
                {/*            })*/}
                {/*        }*/}
                {/*    </Grid>*/}
                {/*    </Box>*/}
                {/*</Box>*/}
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {
                            filteredWidgetDetails.map(
                                (widgetDetail, index) => {
                                    return (
                                        <Grid key={`GridItem-${index}`} item xs={12} sm={6} md={4} lg={4}>
                                            <WidgetBrowserItem
                                                showImages={showImages}
                                                thumbnail={widgetDetail.thumbnail}
                                                title={widgetDetail.title}
                                                onClick={() => addWidget(widgetDetail)}
                                            />
                                        </Grid>
                                    );
                                }
                            )
                        }
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
