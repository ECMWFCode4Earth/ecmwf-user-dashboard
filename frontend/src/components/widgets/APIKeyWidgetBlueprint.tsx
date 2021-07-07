import React, { useContext, useEffect, useState } from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";
import { APIKeyWidgetBuilder } from "../../models/APIKeyWidgetBuilder";
import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import { WidgetBuilderContext } from "../../library/contexts/WidgetBuilderContext";
import WidgetBody from "../common/WidgetBody";
import axios from "axios";
import WidgetError from "../common/WidgetError";
import WidgetLoading from "../common/WidgetLoading";
import { kBorder } from "../../library/constants/constants";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface APIKeyWidgetBlueprintProps {
  builder: APIKeyWidgetBuilder
}


const APIKeyWidgetBlueprint: React.FC<APIKeyWidgetBlueprintProps> = ({builder}) => {

  const classes = useStyles();
  const {removeWidgetBuilder} = useContext(WidgetBuilderContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [apiKey, setAPIKey] = useState("");

  useEffect(() => {
    fetchAPIKey();
  }, []);


  const fetchAPIKey = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/backend/api_key", {withCredentials: true});
      setAPIKey(res.data.key);
      setLoading(false);
    } catch (e) {
      setError("An error occurred");
    }
  };

  const removeWidget = () => removeWidgetBuilder(builder);

  if (error) return <WidgetError message={error} border={kBorder.WIDGET_BORDER}/>;

  if (loading) return <WidgetLoading border={kBorder.WIDGET_BORDER}/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={"API Key"} onClose={removeWidget}/>

      <WidgetBody>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <TextField
            id="outlined-read-only-input"
            label="API Key"
            defaultValue={apiKey}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            size={"small"}
          />
        </Box>
      </WidgetBody>

    </WidgetContainer>
  );

};


export default APIKeyWidgetBlueprint;
