/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

/**
 * Displays a single sidebar element with each device's ID and name.
 * @param props Properties containing the current device's ID and name.
 */
function DeviceListElementView(props) {
    return (
        <li className={props.device === props.activeDevice ? "active" : ""}><a onClick={() => props.actions.setActive(props.device.get('id'))}>{props.device.get('name')}</a></li>
    );
}

export default DeviceListElementView;
