import { useContext, useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";

import { useDrawer } from "../../utils/hooks/useDrawer";
import { MARSActivityWidgetBuilder } from "../../models/widgetBuilders/MARSActivityWidgetBuilder";


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


interface MARSActivityWidgetBlueprintProps {
  builder: MARSActivityWidgetBuilder
}


const MARSActivityWidgetBlueprint: React.FC<MARSActivityWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);


  // const [activity, setActivity] = useState<Record<string, number>[]>([])
  const [activity, setActivity] = useState<any[]>([])


  useEffect(() => {
    fetchMARSActivity().catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    console.log(activity)
  })

  const fetchMARSActivity = async () => {
    const res = await axios.get("http://localhost:8000/api/mars-activity");
    console.log(res.data.data);
    setActivity(Object.keys(res.data.data).filter((key) => key !== "uid" && key !== "tracker").map((key) => [key, res.data.data[key]]))
    setLoading(false);
  };

  const removeWidget = () => {};

  if (loading) return <WidgetLoading/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={"MARS Activity"} onClose={removeWidget}/>

      <WidgetBody>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Stat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activity.map((ac) => (
                <TableRow key={ac[0]} style={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row">
                    <Box>
                      {ac[0]}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box>
                      {ac[1]}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </WidgetBody>

    </WidgetContainer>
  );

};


export default MARSActivityWidgetBlueprint;
