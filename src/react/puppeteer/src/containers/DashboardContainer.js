/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardView from '../views/DashboardView';
// import Actions from '../actions/index';
import * as Actions from '../actions/DeviceActions';

const Dashboard = ({
    devices,
    activeDevice,
    actions}) => (
    <div>
        <DashboardView actions={actions}
                       devices={devices}
                       activeDevice={activeDevice}
        />
    </div>
);

const mapStateToProps = (state) => {
    const devices = state.DeviceReducer.get('devices');
    return ({
        devices,
        activeDevice: devices.filter(d => d.get('id') === state.DeviceReducer.get('activeDevice')).first(),
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
