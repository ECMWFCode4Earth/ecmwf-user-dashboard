import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { SatelliteAlertsWidgetBuilder } from "../../models/SatelliteAlertsWidgetBuilder";
import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import axios from "axios";
import { WidgetBuilderContext } from "../../library/contexts/WidgetBuilderContext";
import WidgetLoading from "../common/WidgetLoading";
import { TransitionProps } from "@material-ui/core/transitions";
import { useDrawer } from "../../library/hooks/useDrawer";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        display: "static",
      },
      table: {
        // minWidth: 650,
      },
    }
  )
);


interface SatelliteAlertsWidgetBlueprintProps {
  builder: SatelliteAlertsWidgetBuilder
}


function createData(name: string, status: number) {
  return { name, status };
}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const SatelliteAlertsWidgetBlueprint: React.FC<SatelliteAlertsWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const [reports, setReports] = useState<any>({});
  const [instruments, setInstruments] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const { open, onOpen, onClose } = useDrawer();

  const { removeWidgetBuilder } = useContext(WidgetBuilderContext);


  useEffect(() => {
    fetchSatelliteAlerts();
  }, []);


  const fetchSatelliteAlerts = async () => {
    const res = await axios.get("http://localhost:8000/backend/satellite-alerts");
    const reports = res.data.report;
    console.log(reports);
    setReports(reports);
    setLoading(false);
  };

  const removeWidget = () => removeWidgetBuilder(builder);

  if (loading) return <WidgetLoading/>;

  return (
    <>
      <WidgetContainer>

        <WidgetTitleBar title={"Satellite Alerts"} onClose={removeWidget}/>

        <WidgetBody>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(reports).map((key) => (
                  <TableRow onClick={() => {
                    setInstruments(reports[key].instruments);
                    onOpen();
                  }} key={key} style={{ cursor: "pointer" }}>
                    <TableCell component="th" scope="row">
                      <Box color={reports[key].status !== 0 && "error.light"}>
                        {key}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box color={reports[key].status !== 0 && "error.light"}>
                        {reports[key].status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </WidgetBody>

      </WidgetContainer>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"md"}
        fullWidth
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Instruments</DialogTitle>
        <DialogContent style={{ padding: "32px" }}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Instrument</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(instruments).map((key) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{instruments[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>

  );

};


export default SatelliteAlertsWidgetBlueprint;
