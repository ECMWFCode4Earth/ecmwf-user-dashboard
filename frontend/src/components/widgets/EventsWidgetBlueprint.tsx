import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

import { EventsWidgetBuilder } from "../../models/EventsWidgetBuilder";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";
import EventContainer from "./events/EventContainer";

import { useForceUpdate } from "../../library/hooks/useForceUpdate";
import { kBorder } from "../../library/constants/constants";
import { WidgetBuilderContext } from "../../library/contexts/WidgetBuilderContext";


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


interface EventsWidgetBlueprintProps {
  builder: EventsWidgetBuilder;
}


const EventsWidgetBlueprint: React.FC<EventsWidgetBlueprintProps> = ({builder}) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState<any>([]); // TODO
  const {removeWidgetBuilder} = useContext(WidgetBuilderContext);

  const triggerRebuild = useForceUpdate();
  builder.setRebuildTrigger(triggerRebuild);

  useEffect(() => {
    fetchQuery().catch(() => setError("An error has occurred"));
  }, []);

  const fetchQuery = async () => {
    const res = await axios.get(builder.QUERY_URL.toString());
    const events = res.data.results;
    setEvents(events);
    setLoading(false);
  };

  const removeWidget = () => removeWidgetBuilder(builder);

  if (error) return <WidgetError message={error} border={kBorder.WIDGET_BORDER}/>;

  if (loading) return <WidgetLoading border={kBorder.WIDGET_BORDER}/>;

  return (
    <WidgetContainer>

      <WidgetTitleBar title={"Events"} onClose={removeWidget}/>

      <WidgetBody>
        {
          events.map(
            (event: any) => {
              return (
                <EventContainer
                  key={event.id}
                  title={event.title}
                  organisedBy={event.creator.fullName}
                  category={event.category}
                  startDate={`${event.startDate.date} ${event.startDate.time} (${event.startDate.tz}`}
                  endDate={`${event.endDate.date} ${event.endDate.time} (${event.endDate.tz}`}
                  link={event.url}
                />
              );
            }
          )
        }
      </WidgetBody>

    </WidgetContainer>
  );

};


export default EventsWidgetBlueprint;
