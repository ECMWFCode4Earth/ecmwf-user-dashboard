export default {}
// import React, { useContext, useEffect, useState } from "react";
// import { Box, Button, Dialog, DialogTitle, Grid, makeStyles, Slide, TextField, Typography } from "@material-ui/core";
// import { TransitionProps } from "@material-ui/core/transitions";
// import axios from "axios";
//
// import { ChartWidgetBuilder } from "../models/widgetBuilders/ChartWidgetBuilder";
//
// import { WidgetBuilderContext } from "../utils/contexts/WidgetBuilderContext";
// import _ from "lodash";
//
//
// const useStyles = makeStyles(
//   (theme) => (
//     {}
//   )
// );
//
//
// interface ChartBrowserProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
//
//
// interface ChartDetail {
//   title: string;
//   name: string;
//   thumbnail: string;
// }
//
//
// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & { children?: React.ReactElement<any, any> },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
//
//
// interface ChartBrowserItemProps {
//   thumbnail: string;
//   title: string;
//   onClick: (event: React.MouseEvent) => void
// }
//
//
// const ChartBrowserItem: React.FC<ChartBrowserItemProps> = ({thumbnail, title, onClick}) => {
//   return (
//     <Box bgcolor={"grey.200"} p={1}>
//       <Box>
//         {/*<img width={"100%"} src={thumbnail} alt={"chart thumbnail"}/>*/}
//       </Box>
//       <Box>
//         <Typography variant={"h5"} align={"center"}>{title}</Typography>
//         <Button
//           onClick={onClick}
//           size={"small"} variant={"text"} fullWidth disableElevation>Add Chart</Button>
//       </Box>
//     </Box>
//   );
// };
//
//
// const ChartBrowser: React.FC<ChartBrowserProps> = ({isOpen, onClose}) => {
//
//   const classes = useStyles();
//   const {widgetBuilders, setWidgetBuilders} = useContext(WidgetBuilderContext);
//   const [chartDetails, setChartDetails] = useState<ChartDetail[]>([]);
//   const [searchString, setSearchString] = useState("");
//   const [allDetails, setAllDetails] = useState<ChartDetail[]>([])
//
//   useEffect(() => {
//     fetchChartDetails().catch((err) => console.log(err));
//   }, []);
//
//   const fetchChartDetails = async () => {
//     const res = await axios.get("http://127.0.0.1:8000/backend/opencharts/products");
//     const products = res.data.products;
//     const chartDetails: ChartDetail[] = [];
//     products.forEach((product: any) => chartDetails.push({
//       title: product.title,
//       name: product.name,
//       thumbnail: product.thumbnail
//     }));
//     setChartDetails(chartDetails);
//     setAllDetails(chartDetails);
//   };
//
//   const addChartWidgetToCanvas = (chartDetail: ChartDetail) => {
//     setWidgetBuilders([...widgetBuilders, new ChartWidgetBuilder(chartDetail.title, chartDetail.name)]);
//     onClose();
//   };
//
//   const filterCharts = (partialName: string) => {
//     if (partialName.trim().length === 0) {
//       setChartDetails(allDetails);
//       return;
//     }
//     setChartDetails(allDetails.filter(chartDetail => chartDetail.title.includes(partialName.trim())));
//   };
//
//   const handleSearchOnChange = async (e: any) => {
//     const f = _.debounce(() => filterCharts(e.target.value), 50);
//     // filterCharts(e.target.value)
//     f();
//
//
//   };
//
//   return (
//     <Dialog
//       open={isOpen}
//       onClose={onClose}
//       fullWidth={true}
//       maxWidth={"lg"}
//       TransitionComponent={Transition}
//       aria-labelledby={"chart-browser"}
//     >
//       <DialogTitle id={"chart-browser"}>
//         <Typography variant={"h1"}>Chart Browser</Typography>
//       </DialogTitle>
//       <Box mx={2} mb={1}>
//         <TextField  onChange={handleSearchOnChange} fullWidth size={"small"} label="Search"
//                    variant="outlined"/>
//       </Box>
//       <Box p={2}>
//         <Grid container spacing={3}>
//           {
//             chartDetails.map(
//               (chartDetail, idx) => {
//                 return (
//                   <Grid key={`GridItem-${idx}`} item xs={12} md={6} lg={4}>
//                     <ChartBrowserItem
//                       thumbnail={chartDetail.thumbnail}
//                       title={chartDetail.title}
//                       onClick={() => addChartWidgetToCanvas(chartDetail)}
//                     />
//                   </Grid>
//                 );
//               }
//             )
//           }
//         </Grid>
//       </Box>
//     </Dialog>
//   );
//
// };
//
//
// export default ChartBrowser;
