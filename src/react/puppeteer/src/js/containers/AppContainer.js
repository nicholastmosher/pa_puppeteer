/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import NavigationView from '../views/NavigationView';
import DashboardView from '../views/DashboardView';

const AppContainer = (props) => (
  <div>
    <NavigationView />
    <DashboardView />
  </div>
);

export default AppContainer;
