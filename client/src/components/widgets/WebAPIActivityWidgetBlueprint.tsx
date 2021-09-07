import { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";

import { WebAPIActivityWidgetBuilder } from "../../models/widgetBuilders/WebAPIActivityWidgetBuilder";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import { kStore } from "../../utils/constants";
import { AuthContext } from "../../utils/contexts/AuthContext";


interface WebAPIActivityWidgetBlueprintProps {
  builder: WebAPIActivityWidgetBuilder
}


const WebAPIActivityWidgetBlueprint: React.FC<WebAPIActivityWidgetBlueprintProps> = ({ builder }) => {

  const { user } = useContext(AuthContext);
  const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState<[string, number][]>([]);


  useEffect(() => {
    fetchMARSActivity().catch((e) => console.error(e));
  }, []);


  const fetchMARSActivity = async () => {
    try {
      const res = await axios.get(`${kStore.BASE_URL}/api/web-api-activity`, {
        headers: { Authorization: user?.token }
      });
      setActivity(Object.keys(res.data.data).filter((key) => key !== "uid" && key !== "tracker").map((key) => [key, res.data.data[key]]));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const removeWidget = () => removeWidgetFromCurrentTab(builder.widgetId);


  if (error) return <WidgetError message={error} onClose={removeWidget}/>;

  if (loading) return <WidgetLoading onClose={removeWidget}/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={"Web API Activity"} onClose={removeWidget}/>

      <WidgetBody>

        <TableContainer>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell size={"small"}>Name</TableCell>
                <TableCell size={"small"} align={"right"}>Statistic</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activity.map(([name, statistic]) => (
                <TableRow hover key={name}>
                  <TableCell scope={"row"}>
                    {name}
                  </TableCell>
                  <TableCell align={"right"}>
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


export default WebAPIActivityWidgetBlueprint;
