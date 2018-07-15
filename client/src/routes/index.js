import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppNavbar from '../components/AppNavbar';
import Overall from './Overall';
import Tournament from './Tournament';

export default () => (
  <Router>
    <div>
      <AppNavbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Overall} />
          <Route path="/Masters" render={props => (
            <Tournament name="The Masters" {...props} />
          )} />
          <Route path="/USOpen" render={props => (
            <Tournament name="US Open" {...props} />
          )} />
          <Route path="/OpenChampionship" render={props => (
            <Tournament name="Open Championship" {...props} />
          )} />
          <Route path="/PGAChampionship" render={props => (
            <Tournament name="PGA Championship" {...props} />
          )} />
        </Switch>
      </div>
    </div>
  </Router>
);
