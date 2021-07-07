/**
 *
 * Created on June 25, 2021
 * */

import React from "react";
import { Box, Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";


const useStyles = makeStyles(
  (theme) => (
    {
      root: {
        display: "static",
      }
    }
  )
);


interface EventContainerProps {
  title: string;
  organisedBy: string;
  category: string;
  startDate: string;
  endDate: string;
  link: string;
}


const EventContainer: React.FC<EventContainerProps> = ({title, organisedBy, category, startDate, endDate, link}) => {

  const classes = useStyles();

  return (
    <Box px={1} py={0.5}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant={"h4"}>{title}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant={"caption"}>Organised by {organisedBy} </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant={"caption"}>Category {category}</Typography>
            </Grid>
            <Grid item>
              <Typography variant={"h6"}>
                Start Date {startDate})
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={"h6"}>End Date {endDate})</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button href={link} target={"_blank"} size={"small"}>View Event</Button>
        </CardActions>
      </Card>
    </Box>
  );

};


export default EventContainer;
