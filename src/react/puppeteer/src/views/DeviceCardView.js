/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

function DeviceCardView(props) {
    return (
        <div className="panel panel-default" role="tablist" aria-multiselectable="true">
            <div className="panel-heading">
                <h3 className="panel-title"><b>Device Info</b></h3>
            </div>
            <table className="table">
                <tbody>
                    <tr><td>ID</td><td>{props.activeDevice.get('id')}</td></tr>
                    <tr><td>Name</td><td>{props.activeDevice.get('name')}</td></tr>
                    <tr><td>Host</td><td>{props.activeDevice.get('host')}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

export default DeviceCardView;
