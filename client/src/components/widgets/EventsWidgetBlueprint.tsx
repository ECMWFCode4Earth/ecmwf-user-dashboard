import React, { useContext, useEffect, useState } from "react";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";

import { EventsWidgetBuilder } from "../../models/widgetBuilders/EventsWidgetBuilder";

import WidgetContainer from "../common/WidgetContainer";
import WidgetTitleBar from "../common/WidgetTitleBar";
import WidgetBody from "../common/WidgetBody";
import WidgetLoading from "../common/WidgetLoading";
import WidgetError from "../common/WidgetError";
import EventContainer from "./events/EventContainer";

import { TabManagerContext } from "../../utils/contexts/TabManagerContext";
import { kStore } from "../../utils/constants";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { format } from "date-fns";


interface EventsWidgetBlueprintProps {
  builder: EventsWidgetBuilder;
}


const EventsWidgetBlueprint: React.FC<EventsWidgetBlueprintProps> = ({ builder }) => {

  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { removeWidgetFromCurrentTab } = useContext(TabManagerContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState<{ upcomingEvents: any[], completedEvents: any[] }>({
    upcomingEvents: [],
    completedEvents: []
  });


  useEffect(() => {
    fetchQuery().catch(() => setError("An error has occurred"));
  }, []);

  const fetchQuery = async () => {
    const res = await axios.get(`${kStore.BASE_URL}/api/events`, { headers: { Authorization: user?.token } });
    const upcomingEvents = res.data.data.upcomingEvents;
    const completedEvents = res.data.data.completedEvents;
    setEvents({ upcomingEvents, completedEvents });
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

      <WidgetTitleBar title={"Events"} onClose={removeWidget}/>

      <WidgetBody>

        <Box mt={1} px={1}>
          <Box px={1}>
            <Typography variant={"h6"}>Upcoming Events</Typography>
          </Box>
          {
            events.upcomingEvents.map(
              (event: any, index) => {
                return (
                  <EventContainer
                    key={`UpcomingEvent-${index}`}
                    title={event.title}
                    organisedBy={event.organiser}
                    category={event.category}
                    startDate={`${format(new Date(`${event.startDate.date}T${event.startDate.time}`), "MMM dd, yyy h:mm a")} (${event.startDate.tz}`}
                    endDate={`${format(new Date(`${event.endDate.date}T${event.endDate.time}`), "MMM dd, yyy h:mm a")} (${event.endDate.tz}`}
                    link={event.url}
                  />
                );
              }
            )
          }
        </Box>
        <Box mt={2}>
          <Divider/>
        </Box>
        <Box mt={1} px={1}>
          <Box px={1}>
            <Typography variant={"h6"}>Completed Events</Typography>
          </Box>
          {
            events.completedEvents.map(
              (event: any, index) => {
                return (
                  <EventContainer
                    key={`UpcomingEvent-${index}`}
                    title={event.title}
                    organisedBy={event.organiser}
                    category={event.category}
                    startDate={`${format(new Date(`${event.startDate.date}T${event.startDate.time}`), "MMM dd, yyy h:mm a")} (${event.startDate.tz}`}
                    endDate={`${format(new Date(`${event.endDate.date}T${event.endDate.time}`), "MMM dd, yyy h:mm a")} (${event.endDate.tz}`}
                    link={event.url}
                  />
                );
              }
            )
          }
        </Box>

      </WidgetBody>

    </WidgetContainer>
  );

};


const useStyles = makeStyles(
  (theme) => (
    {}
  )
);


export default EventsWidgetBlueprint;
