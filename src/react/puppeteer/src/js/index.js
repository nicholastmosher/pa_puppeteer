import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';

require('bootstrap');
import '../stylesheets/main.scss';

const history = createHistory();
const store = configureStore(history);

/**
 * Route configuration:
 *
 * / -> /dashboard
 * /dashboard -> /dashboard/devices
 *
 * /dashboard/devices
 * /dashboard/devices/:deviceId
 * /dashboard/devices/:deviceId/sinks
 * /dashboard/devices/:deviceId/sinks/:sinkId
 * /dashboard/devices/:deviceId/modules
 * /dashboard/devices/:deviceId/modules/:moduleId
 */

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={AppContainer}/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
