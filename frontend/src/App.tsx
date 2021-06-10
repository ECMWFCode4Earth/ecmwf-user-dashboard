import React from "react";
import { Box } from "@material-ui/core";
import DashboardPage from "./pages/dashboard";


const App = () => {
  return (
    <Box width={"100vw"} minHeight={"100vh"} style={{overflowX: "scroll"}}>
      <DashboardPage />
    </Box>
  );
};


export default App;
