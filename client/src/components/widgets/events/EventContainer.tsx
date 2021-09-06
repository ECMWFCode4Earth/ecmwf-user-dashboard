/**
 *
 * Created on June 25, 2021
 * */

import React from "react";
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Typography } from "@material-ui/core";


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


const EventContainer: React.FC<EventContainerProps> = ({ title, organisedBy, category, startDate, endDate, link }) => {

  const classes = useStyles();

  return (
    <Box px={1} py={1}>
      <Card className={classes.root} variant={"outlined"}>
        <CardContent >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant={"h6"}>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display={"flex"} >
                <Typography variant={"caption"}><b>Organiser:</b> {organisedBy} </Typography>
                <Box mx={1}>
                <Divider orientation="vertical" />
                </Box>
                <Typography variant={"caption"}><b>Category:</b> {category}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant={"caption"}><b>Date:</b> {startDate}) - {endDate})</Typography>
              </Box>
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
