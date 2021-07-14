import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import ChartBrowserPage from "./pages/charts";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={DashboardPage} exact/>
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/charts"} component={ChartBrowserPage} />
      </Switch>
    </Router>
  );
};


export default App;
