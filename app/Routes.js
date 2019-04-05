import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PersiapanPage from './containers/PersiapanPage';
import UjianPage from './containers/UjianPage';
import HasilPage from './containers/HasilPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HASIL} component={HasilPage} />
      <Route path={routes.UJIAN} component={UjianPage} />
      <Route path={routes.PERSIAPAN} component={PersiapanPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
