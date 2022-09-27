import React, { useContext, useEffect, useState } from "react";
import {
  IconButton,
  makeStyles,
  Table, TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import { ServiceStatusWidgetBuilder } from "../../models/widgetBuilders/ServiceStatusWidgetBuilder";
import { kStore } from "../../utils/constants";
import { TabManagerContext } from "../../utils/contexts/TabManagerContext";


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
  const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [serviceStatusDetails, setServiceStatusDetails] = useState<ServiceStatusDetails[]>([]);


  useEffect(() => {
    fetchQuery().catch((err) => setError("An error occurred. Failed to fetch data from backend server."));
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

  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);

  const countOk = () => serviceStatusDetails.reduce((ok, data) => data.Status === "Ok" ? ok + 1 : ok, 0);

  const title = `Service Status (${countOk()}/${serviceStatusDetails.length} Ok)`;

  const callback = () => {
    setLoading(true)
  }

  if (error) return <WidgetError callback={callback} message={error} onClose={removeWidget}/>;


  if (loading) return <WidgetLoading onClose={removeWidget}/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={title} onClose={removeWidget}>
        <IconButton href={"https://www.ecmwf.int/en/service-status"} target={"_blank"} color={"inherit"} size={"small"}>
          <ExitToAppIcon fontSize={"small"}/>
        </IconButton>
      </WidgetTitleBar>

      <WidgetBody>

        <TableContainer>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell size={"small"}>Service</TableCell>
                <TableCell size={"small"} align={"right"}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {serviceStatusDetails.map(
                (data) => {
                  return (
                    <TableRow hover={data.Status === "Ok"} key={data.Title}
                              className={data.Status === "Ok" ? classes.rowOk : classes.rowNotOk}>
                      <TableCell scope={"row"}>
                        {data.Title}
                      </TableCell>
                      <TableCell align={"right"} className={data.Status === "Ok" ? classes.cellOk : classes.cellNotOk}>
                        {data.Status}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}

            </TableBody>

          </Table>
        </TableContainer>

      </WidgetBody>

    </WidgetContainer>
  );

};


const useStyles = makeStyles(
  (theme) => (
    {
      cellOk: {
        color: theme.palette.success.dark,
        fontWeight: "bold"
      },
      cellNotOk: {
        color: theme.palette.error.main,
      },
      rowOk: {
        cursor: "pointer",
      },
      rowNotOk: {
        // backgroundColor: theme.palette.error.light,
        cursor: "pointer",
        "&:hover": {
          // backgroundColor: theme.palette.error.main,
        }
      }
    }
  )
);


export default ServiceStatusWidgetBlueprint;
