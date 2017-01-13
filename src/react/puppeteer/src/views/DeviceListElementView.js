/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Displays a single sidebar element with each device's ID and name.
 * @param props Properties containing the current device's ID and name.
 */
function DeviceListElementView(props) {
    return (
        <li className="nav-item">
            <a className={classNames(
                "nav-link",
                {
                    active: props.device === props.activeDevice,
                }
            )} onClick={() => props.actions.setActive(props.device.get('id'))}>
                {props.device.get('name')}
            </a>
        </li>
    );
}

export default DeviceListElementView;
