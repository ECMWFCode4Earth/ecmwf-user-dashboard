/**
 * Blueprint of Service Status Widget.
 * - Builder class uses this to build widget
 * */

import React, { useEffect, useState } from "react";
import { makeStyles, Box, Grid, Typography, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import { ServiceStatusWidgetBuilder } from "../../models/ServiceStatusWidgetBuilder";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";
import { kBorder } from "../../library/constants/constants";
import { useForceUpdate } from "../../library/hooks/useForceUpdate";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        height: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
        position: "relative",
        border: kBorder.WIDGET_BORDER,
        borderRadius: theme.shape.borderRadius,
      },
      titleBar: {
        position: "sticky",
        top: 0,
        left: 0,
        color: "white",
        backgroundColor: theme.palette.common.black,
        opacity: 0.95,
        cursor: "grab",
        "& .title": {
          padding: `${theme.spacing(0.5)}px 0`,
          textAlign: "center",
        },
        "& .externalLink": {
          position: "absolute",
          margin: 0,
          padding: 0,
          top: "3px",
          right: "8px"
        }
      },
      gridItem: {
        "& .container": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        "& .title": {
          fontWeight: 600
        },
        "& .status": {
          fontWeight: 600
        }
      }
    }
  )
);


/**
 * Structure of incoming data from the backend.
 * */
interface BackendDataType {
  Title: string,
  Status: string,
  "Last notification": string
}

interface ServiceStatusWidgetBlueprint {
  builder: ServiceStatusWidgetBuilder;
}


const ServiceStatusWidgetBlueprint: React.FC<ServiceStatusWidgetBlueprint> = ({ builder }) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [serviceStatusData, setServiceStatusData] = useState<BackendDataType[]>([]);

  const rebuildTrigger = useForceUpdate();
  builder.setRebuildTrigger(rebuildTrigger)

  useEffect(() => {
    fetchQuery().catch(() => setError("An error has occurred"));
  }, []);

  const fetchQuery = async () => {
    const res = await axios.get(builder.QUERY_URL.toString());
    const nodes = res.data.nodes;
    const serviceStatusData: BackendDataType[] = [];
    nodes.forEach((edge: { node: BackendDataType }) => serviceStatusData.push(edge.node));
    setServiceStatusData(serviceStatusData);
    setLoading(false);
  };

  const countOk = () => {
    let Ok = 0;
    serviceStatusData.forEach((data) => data.Status === "Ok" && Ok++);
    return Ok;
  };

  if (error) return <WidgetError message={error} border={kBorder.WIDGET_BORDER}/>;

  if (loading) return <WidgetLoading border={kBorder.WIDGET_BORDER}/>;

  return (
    <Box className={classes.root}>

      <Box className={classes.titleBar}>
        <Typography className={"title"}>
          Service Status ({countOk()}/{serviceStatusData.length} Ok)
        </Typography>
        <a href={builder.REFERENCE_URL.toString()} target={"_blank"}>
          <IconButton
            color={"inherit"}
            aria-label={"Link to Service Status Page"}
            component={"span"}
            className={"externalLink"}
          >
            <ExitToAppIcon fontSize={"small"}/>
          </IconButton>
        </a>
      </Box>

      <Grid container alignItems={"center"}>
        {serviceStatusData.map(
          (data) => {
            return (
              <Grid item xs={6} key={data.Title} className={classes.gridItem}>
                <Box p={1} className={"container"}>
                  <Typography variant={"body2"} className={"title"}>{data.Title}</Typography>
                  <Box color={data.Status === "Ok" ? "success.main" : "error.main"}>
                    <Typography variant={"body2"} className={"status"} color={"inherit"}>{data.Status}</Typography>
                  </Box>
                </Box>
              </Grid>
            );
          }
        )}
      </Grid>

    </Box>
  );

};


export default ServiceStatusWidgetBlueprint;
