/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import DeviceListView from './DeviceListView';
import DeviceView from './DeviceView';
import AddDeviceModalView from './AddDeviceModalView';
import '../stylesheets/DashboardView.css';

const handleAddDevice = (name, desc, host) => {
    if (name.length === 0 || host.length === 0) {

    }
};

const handleSwitchDevice = (props, id) => {
    props.actions.setActive(id);
};

/**
 * Encapsulates the top navigation bar and the contents of the page.
 * @param props
 */
function DashboardView(props) {
    const addDeviceModal = "AddDeviceModal";
    return (
        <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Pulse Audio Puppeteer</a>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <DeviceListView addDeviceModal={addDeviceModal}
                                        onSwitchDevice={handleSwitchDevice} {...props} />
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <DeviceView onAddDevice={handleAddDevice} {...props} />
                    </div>
                </div>
            </div>
            <AddDeviceModalView addDeviceModal={addDeviceModal}/>
        </div>
    );
}

export default DashboardView;
