import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

import { EventsWidgetBuilder } from "../../models/widgetBuilders/EventsWidgetBuilder";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";
import EventContainer from "./events/EventContainer";



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


  // useEffect(() => {
  //   fetchQuery().catch(() => setError("An error has occurred"));
  // }, []);
  //
  // const fetchQuery = async () => {
  //   const res = await axios.get(builder.queryUrl.toString());
  //   const events = res.data.results;
  //   setEvents(events);
  //   setLoading(false);
  // };

  const removeWidget = () => {};

  if (error) return <WidgetError message={error} onClose={removeWidget} />;

  if (loading) return <WidgetLoading />;

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
