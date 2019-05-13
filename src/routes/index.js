import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable';
import NotFound from './notFound';

const Home = Loadable({
  loader: () => import('../components/home'),
  loading: () => <div>Loading...</div>
});

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route component={NotFound} />
    </Switch>
      
  </div>
);

export default Routes;