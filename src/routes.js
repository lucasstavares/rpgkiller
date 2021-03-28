import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoutes.js";
import CreateMesa from "./components/CreateMesa.js";
import Dashboard from "./pages/dashboard.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import { logout } from "./pages/logout.js";
import Table from "./components/Table.js";
import SearchTables from "./components/SearchTables.js";

function MainRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route path="/searchTables" component={SearchTables} />
        <PrivateRoute path="/createTable" component={CreateMesa} />
        <PrivateRoute path="/logout" component={logout} />
        <PrivateRoute exact path="/table/:id" component={Table} />
      </Switch>
    </Router>
  );
}

export default MainRoutes;
