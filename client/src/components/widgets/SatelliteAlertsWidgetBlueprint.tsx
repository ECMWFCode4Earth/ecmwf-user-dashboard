import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";
import WidgetDialog from "../common/WidgetDialog";

import { SatelliteAlertsWidgetBuilder } from "../../models/widgetBuilders/SatelliteAlertsWidgetBuilder";

import { kStore } from "../../utils/constants";
import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import { useDrawer } from "../../utils/hooks/useDrawer";


interface SatelliteAlertsWidgetBlueprintProps {
  builder: SatelliteAlertsWidgetBuilder
}


const SatelliteAlertsWidgetBlueprint: React.FC<SatelliteAlertsWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reports, setReports] = useState<Record<string, Record<string, any>>>({});
  const [instruments, setInstruments] = useState<Record<string, number>>({});

  const { open, onOpen, onClose } = useDrawer();


  useEffect(() => {
    fetchSatelliteAlerts().catch((err) => setError(err.message));
  }, []);


  const fetchSatelliteAlerts = async () => {
    const res = await axios.get(`${kStore.BASE_URL}/api/satellite-alerts`);
    const reports = res.data.data.report;
    console.log(reports);
    setReports(reports);
    setLoading(false);
  };


  const openInstruments = (instruments: Record<string, number>) => {
    setInstruments(instruments);
    onOpen();
  };

  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);


  if (error) return <WidgetError message={error} onClose={removeWidget}/>;

  if (loading) return <WidgetLoading onClose={removeWidget}/>;

  return (
    <>
      <WidgetContainer>

        <WidgetTitleBar title={"Satellite Alerts"} onClose={removeWidget}/>

        <WidgetBody>

          <TableContainer>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell size={"small"}>Name</TableCell>
                  <TableCell size={"small"} align={"right"}>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {Object.keys(reports || {}).map((key) => (
                  <TableRow hover onClick={() => openInstruments(reports[key].instruments)} key={key}
                            className={classes.row}>
                    <TableCell scope={"row"} className={reports[key].status !== 0 ? classes.cellError : ""}>
                      {key}
                    </TableCell>
                    <TableCell align={"right"} className={reports[key].status !== 0 ? classes.cellError : ""}>
                      {reports[key].status}
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>

            </Table>
          </TableContainer>


        </WidgetBody>

      </WidgetContainer>

      <WidgetDialog title={"Instruments"} open={open} onClose={onClose}>
        <TableContainer variant={"outlined"} component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell size={"small"}>Instrument</TableCell>
                <TableCell align={"right"} size={"small"}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(instruments).map((key) => (
                <TableRow hover key={key}>
                  <TableCell scope={"row"} className={instruments[key] !== 0 ? classes.cellError : ""}>
                    {key}
                  </TableCell>
                  <TableCell align={"right"} className={instruments[key] !== 0 ? classes.cellError : ""}>
                    {instruments[key]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </WidgetDialog>

    </>
  );

};


const useStyles = makeStyles(
  (theme) => (
    {
      cellError: {
        color: theme.palette.error.dark,
        fontWeight: "bold"
      },
      row: {
        cursor: "pointer"
      }
    }
  )
);


export default SatelliteAlertsWidgetBlueprint;
