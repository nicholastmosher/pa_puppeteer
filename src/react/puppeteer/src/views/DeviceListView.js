/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import DeviceListElementView from './DeviceListElementView';

/**
 * Displays a sidebar listing the names of all devices belonging to the user.
 * @param props Properties containing a list of devices to create a list of.
 */
function DeviceListView(props) {
    return (
        <ul className="nav nav-sidebar">
            {props.devices.map(device => {
                return (
                    <DeviceListElementView key={device.get('id')}
                                           device={device}
                                           {...props} />
                )
            })}
            <li><a type="button"
                   data-toggle="modal"
                   data-target={"#" + props.addDeviceModal}>
                + New Device
            </a></li>
        </ul>
    );
}

export default DeviceListView;
