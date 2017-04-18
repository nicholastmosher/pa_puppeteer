import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';

import $ from 'jquery';
require('bootstrap');
import '../stylesheets/main.scss';

const history = createHistory();
const store = configureStore(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={AppContainer}/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
