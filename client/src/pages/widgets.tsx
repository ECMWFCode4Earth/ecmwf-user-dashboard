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

interface WidgetDetail {
    title: string;
    name: string;
    thumbnail: string;
    href: string;
    type: string;
    appURL: string;
}


export default function Widgets() {

    const { addNewWidgetFromBrowserToCurrentTab } = useContext(TabManagerContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {open, onClose, onOpen} = useDrawer();

    const [searchString, setSearchString] = useState("");
    const [showImages, setShowImages] = useState(false);
    const [filteredWidgetDetails, setFilteredWidgetDetails] = useState<WidgetDetail[]>([]);
    const [allWidgetDetails, setAllWidgetDetails] = useState<WidgetDetail[]>([]);


    useEffect(() => {
        loadWidgetDetails().catch((err) => setError(err.message));
    }, []);


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

// TODO: title and name are same in widgets data that we get from this file's api query

    const fetchWidgetDetails = async () => {
        setLoading(true);
        const res = await axios.get(`${kStore.BASE_URL}/api/getAllWidgets/`);
        console.log(res.data.data.widgets)
        const widgets = res.data.data.widgets;
        const widgetDetails:WidgetDetail[] = [];
        widgets.forEach((widget: any) => widgetDetails.push({
            title: widget.name,
            name: widget.name,
            thumbnail: !("thumbnail" in widget) ? defaultLogo : widget.thumbnail,
            href: widget.href,
            type: widget["widget-type"],
            appURL: !("application_url" in widget) ? '#' : widget.application_url
        }));
        await localStore.setItem(kLocalStoreKey.WIDGET_DETAILS, widgetDetails);
        setSearchString("");
        setFilteredWidgetDetails(widgetDetails);
        setAllWidgetDetails(widgetDetails);
        setLoading(false);
    };


    const addWidget = (widgetDetail:WidgetDetail) => {
        onClose();
        addNewWidgetFromBrowserToCurrentTab(widgetDetail.type, widgetDetail.title, widgetDetail.name, widgetDetail.href, widgetDetail.appURL);
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


    if (loading) {
        return (
            <Layout showWidgetToolbar={true}>
                <Container maxWidth={"lg"}>

                    <Box mt={2}>
                        <Typography variant={"h3"} align={"center"}>Widget Browser</Typography>
                    </Box>

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
                    <Button size={"small"} onClick={fetchWidgetDetails}>Refresh Widgets</Button>
                </Box>


                <Box mt={2}>
                    <Grid container spacing={2}>
                        {
                            filteredWidgetDetails.map(
                                (widgetDetail, index) => {
                                    return (
                                        <Grid key={`GridItem-${index}`} item xs={12} md={6} lg={4}>
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
