import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import { ServiceStatusWidgetBuilder } from "../../models/ServiceStatusWidgetBuilder";

import { kBorder } from "../../library/constants/constants";
import { useForceUpdate } from "../../library/hooks/useForceUpdate";
import { WidgetBuilderContext } from "../../library/contexts/WidgetBuilderContext";


const useStyles = makeStyles(
  (theme) => (
    {
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
 * Structure of incoming data from the backend. TODO
 * */
interface BackendDataType {
  Title: string,
  Status: string,
  "Last notification": string
}


interface ServiceStatusWidgetBlueprintProps {
  builder: ServiceStatusWidgetBuilder;
}


const ServiceStatusWidgetBlueprint: React.FC<ServiceStatusWidgetBlueprintProps> = ({builder}) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [serviceStatusData, setServiceStatusData] = useState<BackendDataType[]>([]);
  const {removeWidgetBuilder} = useContext(WidgetBuilderContext);

  const rebuildTrigger = useForceUpdate();
  builder.setRebuildTrigger(rebuildTrigger);

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

  const removeWidget = () => removeWidgetBuilder(builder);

  const countOk = () => {
    return serviceStatusData.reduce((ok, data) => data.Status === "Ok" ? ok + 1 : ok, 0);
  };

  const title = `Service Status (${countOk()}/${serviceStatusData.length} Ok)`;

  if (error) return <WidgetError message={error} border={kBorder.WIDGET_BORDER}/>;

  if (loading) return <WidgetLoading border={kBorder.WIDGET_BORDER}/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={title} onClose={removeWidget}>
        <IconButton href={builder.REFERENCE_URL.toString()} target={"_blank"} color={"inherit"} size={"small"}>
          <ExitToAppIcon fontSize={"small"}/>
        </IconButton>
      </WidgetTitleBar>

      <WidgetBody>
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
      </WidgetBody>

    </WidgetContainer>
  );

};


export default ServiceStatusWidgetBlueprint;
