/**
 * Blueprint of Service Status Widget.
 * - Builder class uses this to build widget
 * */

import React, { useEffect, useState } from "react";
import { makeStyles, Box, Grid, Typography, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import { ServiceStatusWidgetBuilder } from "../../models/ServiceStatusWidgetBuilder";


const useStyles = makeStyles(
  (theme) => (
    {
      title: {
        backgroundColor: "black",
        color: "white",
        padding: `${theme.spacing(0.5)}px 0`,
        position: "sticky",
        top: 0,
        left: 0,
      },
      externalButton: {
        position: "absolute",
        top: "5px",
        right: "16px",
        padding: 0
      },
      statusGlowBox: {}
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
  builder: ServiceStatusWidgetBuilder
}


const ServiceStatusWidgetBlueprint: React.FC<ServiceStatusWidgetBlueprint> = ({builder}) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [serviceStatusData, setServiceStatusData] = useState<BackendDataType[]>([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/backend/service_status`)
      .then(res => {
        const nodes = res.data.nodes;
        const data: BackendDataType[] = [];
        nodes.forEach(
          (edge: { node: BackendDataType }) => data.push(edge.node)
        );
        setServiceStatusData(data);
        setLoading(false);
      });
  }, []);

  const countOK = () => {
    let OK = 0;
    const total = serviceStatusData.length;
    serviceStatusData.forEach((data) => data.Status === "Ok" && OK++);
    return { OK, total };
  };

  if (loading) {
    return (
      <>
        <Box width={"100%"} height={"100%"} border={"2px solid black"} display={"flex"} alignItems={"center"}
             justifyContent={"center"}>
          Loading...
        </Box>
      </>
    );
  }

  return (
      <Box
        border={"2px solid black"}
        height={"100%"}
        overflow={"scroll"}
        position={"relative"}
      >
        <Box position={"sticky"} top={0} left={0} color={"white"}>
          <Typography display={"block"} align={"center"} className={classes.title}>Service Status
            ({countOK().OK}/{countOK().total} Ok)</Typography>
          <a href={"https://www.ecmwf.int/en/service-status"} target={"_blank"}>
            <IconButton color={"inherit"} aria-label="upload picture" component="span"
                        className={classes.externalButton}>
              <ExitToAppIcon fontSize={"small"}/>
            </IconButton>
          </a>
        </Box>
        <Grid container>
          {serviceStatusData.map(
            (data) => {
              return (
                <Grid item xs={6}>
                  <Box key={data.Title} p={1} display={"flex"} alignItems={"center"}>
                    <Box width={"16px"} height={"16px"} mr={1} borderRadius={"50%"} bgcolor={"success.main"}
                         flexShrink={0}/>
                    <Typography variant={"body1"}>{data.Title}</Typography>
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
