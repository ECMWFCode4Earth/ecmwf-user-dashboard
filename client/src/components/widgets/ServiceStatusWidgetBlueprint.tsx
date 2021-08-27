import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import { ServiceStatusWidgetBuilder } from "../../models/widgetBuilders/ServiceStatusWidgetBuilder";
import { WidgetBuilderContext } from "../../utils/contexts/WidgetBuilderContext";
import { kStore } from "../../utils/constants/store";


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
 * Structure of incoming data from the backend.
 * */
interface ServiceStatusDetails {
  Title: string,
  Status: string,
  "Last notification": string
}


interface ServiceStatusWidgetBlueprintProps {
  builder: ServiceStatusWidgetBuilder;
}


const ServiceStatusWidgetBlueprint: React.FC<ServiceStatusWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const { removeWidgetBuilder } = useContext(WidgetBuilderContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [serviceStatusDetails, setServiceStatusDetails] = useState<ServiceStatusDetails[]>([]);


  useEffect(() => {
    fetchQuery().catch(() => setError("An error occurred. Failed to fetch data from backend server."));
  }, []);


  const fetchQuery = async () => {
    const data = (await axios.get(`${kStore.BASE_URL}/api/service-status`)).data;
    if (data.success === true) {
      setServiceStatusDetails(data.data);
    } else {
      throw new Error("Backend query error.");
    }
    setLoading(false);
  };

  const removeWidget = () => removeWidgetBuilder(builder);

  const countOk = () => serviceStatusDetails.reduce((ok, data) => data.Status === "Ok" ? ok + 1 : ok, 0);

  const title = `Service Status (${countOk()}/${serviceStatusDetails.length} Ok)`;


  if (error) return <WidgetError message={error} onClose={removeWidget}/>;

  if (loading) return <WidgetLoading/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={title} onClose={removeWidget}>
        <IconButton href={"https://www.ecmwf.int/en/service-status"} target={"_blank"} color={"inherit"} size={"small"}>
          <ExitToAppIcon fontSize={"small"}/>
        </IconButton>
      </WidgetTitleBar>

      <WidgetBody>
        <Grid container alignItems={"center"}>
          {serviceStatusDetails.map(
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
