/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { Route } from 'react-router-dom';
import DevicesView from './DevicesView';
import DeviceDetailsView from './DeviceDetailsView';
import SinksView from './SinksView';
import SinkDetailsView from './SinkDetailsView';
import ModulesView from './ModulesView';
import ModuleDetailsView from './ModuleDetailsView';

const DashboardView = (props) => {
  return (
    <div className="container row">
      <Route exact path="/dashboard/devices" component={DevicesView}/>
      <Route path="/dashboard/devices/:deviceId" component={DevicesView}/>
      <Route path="/dashboard/devices/:deviceId" component={DeviceDetailsView}/>

      <Route exact path="/dashboard/devices/:deviceId/sinks" component={SinksView}/>
      <Route path="/dashboard/devices/:deviceId/sinks/:sinkId" component={SinksView}/>
      <Route path="/dashboard/devices/:deviceId/sinks/:sinkId" component={SinkDetailsView}/>

      <Route exact path="/dashboard/devices/:deviceId/modules" component={ModulesView}/>
      <Route path="/dashboard/devices/:deviceId/modules/:moduleId" component={ModulesView}/>
      <Route path="/dashboard/devices/:deviceId/modules/:moduleId" component={ModuleDetailsView}/>
    </div>
  );
};

export default DashboardView;
