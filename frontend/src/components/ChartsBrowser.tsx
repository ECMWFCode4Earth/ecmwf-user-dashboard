/**
 *
 * */

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { WidgetBuilderContext } from "../library/contexts/WidgetBuilderContext";
import { ChartWidgetBuilder } from "../models/ChartWidgetBuilder";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface ChartsBrowser {

}

interface ChartDetail {
  title: string;
  name: string;
  thumbnail: string;
}


const ChartsBrowser: React.FC<ChartsBrowser> = ({}) => {

  const classes = useStyles();

  const {widgetBuilders, setWidgetBuilders} = useContext(WidgetBuilderContext)

  const [isOpen, setIsOpen] = useState(true);
  const [chartDetails, setChartDetails] = useState<ChartDetail[]>([]);

  useEffect(() => {
    fetchChartDetails().catch((err) => console.log(err));
  }, []);


  const fetchChartDetails = async () => {
    const res = await axios.get("http://127.0.0.1:8000/backend/opencharts/products");
    const products = res.data.products;
    const chartDetails: ChartDetail[] = [];
    products.forEach((product: any) => chartDetails.push({
      title: product.title,
      name: product.name,
      thumbnail: product.thumbnail
    }));
    setChartDetails(chartDetails);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={"charts-browser"}
      open={isOpen}
      fullWidth={true}
      maxWidth={"lg"}
    >
      <DialogTitle id={"charts-browser"}>Charts Browser</DialogTitle>
      <Box p={2}>
        <Grid container spacing={3}>
          {
            chartDetails.map(
              (chartDetail) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                      <img width={"100%"} src={chartDetail.thumbnail} alt={"chart thumbnail"}/>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                      <Typography variant={"h5"}>{chartDetail.title}</Typography>
                      <Button onClick={() => setWidgetBuilders([...widgetBuilders, new ChartWidgetBuilder(chartDetail.title, chartDetail.name)])} style={{flexShrink: 0, backgroundColor: "black", color: "white"}} size={"small"} variant={"contained"} disableElevation>Add Chart</Button>
                    </Box>
                  </Grid>
                );
              }
            )
          }
        </Grid>
      </Box>

    </Dialog>
  );

};


export default ChartsBrowser;
