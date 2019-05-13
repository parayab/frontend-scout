import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import NotFound from "./notFound";

const Home = Loadable({
  loader: () => import("../components/home"),
  loading: () => <div>Loading...</div>
});

const Groups = Loadable({
  loader: () => import("../components/groups"),
  loading: () => <div>Loading...</div>
});

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/groups" component={Groups} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
