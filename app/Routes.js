import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PersiapanPage from './containers/PersiapanPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.PERSIAPAN} component={PersiapanPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
