import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Link from "next/link";

import Layout from "../components/common/Layout";


export default function Home() {
  return (
    <Layout>
      <Box py={4}>
        <Container maxWidth={"md"}>

          <Typography variant={"h3"} align={"center"}>Welcome to ECMWF User Dashboard</Typography>
          <Typography variant={"h6"} align={"center"}>
            This project was developed as part of <a href={"https://esowc.ecmwf.int"}>ESoWC 2021</a>
          </Typography>

          <Box mt={4}>
            <Grid container spacing={2} justifyContent={"center"}>
              <GridItem title={"User Dashboard"} href={"/dashboard"}/>
              <GridItem title={"Shared Dashboard"} href={"/shared-dashboard"}/>
              <GridItem title={"GitHub Repository & Documentation"} href={"https://github.com/esowc/ecmwf-user-dashboard"}/>
            </Grid>
          </Box>

        </Container>
      </Box>
    </Layout>
  );
}


interface GridItemProps {
  href: string;
  title: string;
}


const GridItem: React.FC<GridItemProps> = ({ href, title }) => {
  return (
    <Grid item xs={12} md={6}>
      <Link href={href}>
        <Box
          bgcolor={"secondary.main"}
          borderRadius={"borderRadius"}
          height={"64px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          style={{cursor: "pointer"}}
        >
          <Typography align={"center"} variant={"h6"}>{title}</Typography>
        </Box>
      </Link>
    </Grid>
  );
};
