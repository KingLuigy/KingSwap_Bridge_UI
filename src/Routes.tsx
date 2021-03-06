import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./views/Home";
//import { History } from './pages/History';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    {/* <Route path="/history" component={History} /> */}
    <Redirect to="/" />
  </Switch>
);
