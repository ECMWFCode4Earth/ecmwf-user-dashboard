import React, { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";

import Layout from "../components/common/Layout";

import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import { kLocalStoreKey, kStore } from "../utils/constants";
import localStore from "../utils/localStore";
import { useDrawer } from "../utils/hooks/useDrawer";


interface ChartDetail {
  title: string;
  name: string;
  thumbnail: string;
}


export default function Charts() {

  const { addNewChartWidgetToCurrentTab } = useContext(TabManagerContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const {open, onClose, onOpen} = useDrawer();

  const [searchString, setSearchString] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [filteredChartDetails, setFilteredChartDetails] = useState<ChartDetail[]>([]);
  const [allChartDetails, setAllChartDetails] = useState<ChartDetail[]>([]);


  useEffect(() => {
    loadChartDetails().catch((err) => setError(err.message));
  }, []);


  const loadChartDetails = async () => {
    const savedChartDetails: ChartDetail[] | null = await localStore.getItem(kLocalStoreKey.CHART_DETAILS);
    if (!savedChartDetails) {
      await fetchChartDetails();
      return;
    }
    setAllChartDetails(savedChartDetails);
    setFilteredChartDetails(savedChartDetails);
    setLoading(false);
  };


  const fetchChartDetails = async () => {
    setLoading(true);
    const res = await axios.get(`${kStore.BASE_URL}/api/open-charts/products`);
    const products = res.data.data.products;
    const chartDetails: ChartDetail[] = [];
    products.forEach((product: any) => chartDetails.push({
      title: product.title,
      name: product.name,
      thumbnail: product.thumbnail
    }));
    await localStore.setItem(kLocalStoreKey.CHART_DETAILS, chartDetails);
    setSearchString("");
    setFilteredChartDetails(chartDetails);
    setAllChartDetails(chartDetails);
    setLoading(false);
  };


  const addChartWidget = (chartDetail: ChartDetail) => {
    onClose();
    addNewChartWidgetToCurrentTab(chartDetail.name);
    onOpen();
  };

  const toggleShowImages = () => {
    setShowImages(showImages => !showImages);
  };

  const filterCharts = (partialName: string) => {
    const trimmedPartialName = partialName.trim();
    if (trimmedPartialName.length === 0) {
      setFilteredChartDetails(allChartDetails);
      return;
    }
    setFilteredChartDetails(allChartDetails.filter(chartDetail => chartDetail.title.includes(trimmedPartialName)));
  };

  const debouncedFilterCharts = _.debounce((partialName) => filterCharts(partialName), 1000);

  const handleSearchOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedFilterCharts(e.target.value);
  };


  if (loading) {
    return (
      <Layout showWidgetToolbar={true}>
        <Container maxWidth={"lg"}>

          <Box mt={2}>
            <Typography variant={"h3"} align={"center"}>Chart Browser</Typography>
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
          <Typography variant={"h3"} align={"center"}>Chart Browser</Typography>
        </Box>

        <Box mt={2}>
          <TextField onChange={handleSearchOnChange} fullWidth size={"small"} label={"Search"} variant={"outlined"}/>
        </Box>

        <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Button size={"small"} onClick={toggleShowImages}>Turn {showImages ? "Off" : "On"} Images</Button>
          <Button size={"small"} onClick={fetchChartDetails}>Refresh Charts</Button>
        </Box>


        <Box mt={2}>
          <Grid container spacing={2}>
            {
              filteredChartDetails.map(
                (chartDetail, index) => {
                  return (
                    <Grid key={`GridItem-${index}`} item xs={12} md={6} lg={4}>
                      <ChartBrowserItem
                        showImages={showImages}
                        thumbnail={chartDetail.thumbnail}
                        title={chartDetail.title}
                        onClick={() => addChartWidget(chartDetail)}
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
          autoHideDuration={5000}
          onClose={onClose}
          message={`Added chart to dashboard.`}
        />

      </Container>
    </Layout>
  );
}


interface ChartBrowserItemProps {
  showImages: boolean;
  thumbnail: string;
  title: string;
  onClick: (event: React.MouseEvent) => void
}


const ChartBrowserItem: React.FC<ChartBrowserItemProps> = ({ showImages, thumbnail, title, onClick }) => {
  return (
    <Box bgcolor={"secondary.light"} p={1}>
      <Box>
        {
          showImages && (
            <img width={"100%"} src={thumbnail} alt={"chart thumbnail"}/>
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
            Add Chart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
