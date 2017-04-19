/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavigationView from '../views/NavigationView';
import DashboardView from '../views/DashboardView';

const AppView = (props) => (
  <div>
    <NavigationView />
    <DashboardView />
  </div>
);

const AppContainer = (props) => (
  <div>
    <Redirect from="/" to="/dashboard"/>
    <Redirect from="/dashboard" to="/dashboard/devices"/>
    <Route path="/dashboard" component={AppView}/>
  </div>
);

export default AppContainer;
