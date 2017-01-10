/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardView from '../views/DashboardView';
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
    const activeDevice = devices.filter(d => d.get('id') === state.DeviceReducer.get('activeDevice')).first();
    return ({
        devices,
        activeDevice,
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
