import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead } from "@material-ui/core";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";

import { MARSActivityWidgetBuilder } from "../../models/widgetBuilders/MARSActivityWidgetBuilder";

import { AuthContext } from "../../utils/contexts/AuthContext";
import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import { kStore } from "../../utils/constants";
import WidgetError from "../common/WidgetError";


interface MARSActivityWidgetBlueprintProps {
  builder: MARSActivityWidgetBuilder
}


const MARSActivityWidgetBlueprint: React.FC<MARSActivityWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState<[string, number][]>([]);


  useEffect(() => {
    fetchMARSActivity().catch((e) => setError(e.message));
  }, []);


  const fetchMARSActivity = async () => {
    const res = await axios.get(`${kStore.BASE_URL}/api/mars-activity`, { headers: { Authorization: user?.token } });
    // console.log(res.data.data);
    setActivity(Object.keys(res.data.data).filter((key) => key !== "uid" && key !== "tracker").map((key) => [key, res.data.data[key]]));
    setLoading(false);
  };

  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);
  const callback = () => {
    setLoading(true)
  }

  if (error) return <WidgetError callback={callback} message={error} onClose={removeWidget}/>;

  if (loading) return <WidgetLoading onClose={removeWidget}/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={"MARS Activity"} onClose={removeWidget}/>

      <WidgetBody>
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell size={"small"}>Name</TableCell>
                <TableCell align={"right"} size={"small"}>Statistic</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activity.map(([name, statistic]) => (
                <TableRow hover key={name}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">
                    {statistic}
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


const useStyles = makeStyles(
  (theme) => (
    {

    }
  )
);


export default MARSActivityWidgetBlueprint;
