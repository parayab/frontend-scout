import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import NotFound from "./notFound";
import Layout from "../components/layout/layout";

const Home = Loadable({
  loader: () => import("../components/home"),
  loading: () => <div>Loading...</div>
});

const Groups = Loadable({
  loader: () => import("./groups"),
  loading: () => <div>Loading...</div>
});

const Sections = Loadable({
  loader: () => import("./sections"),
  loading: () => <div>Loading...</div>
});

const Events = Loadable({
  loader: () => import("./events"),
  loading: () => <div>Loading...</div>
});

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/groups" component={Groups} />
      <Route exact path="/sections" component={Sections} />
      <Route exact path="/events" component={Events} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default Routes;
