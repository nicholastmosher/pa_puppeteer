/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

export default function DeviceCardView(props) {
    return (
        <div className="panel panel-default" role="tablist" aria-multiselectable="true">
            <div className="panel-heading">
                <h3 className="panel-title">
                    <a data-toggle="collapse"
                       href="#collapseDevice"
                       aria-expanded="true"
                       aria-controls="deviceSink">
                        <b>Device Info</b>
                    </a>
                </h3>
            </div>
            <div id="collapseDevice" className="collapse in">
                <table className="table">
                    <tbody>
                        <tr><td>Name</td><td>{props.activeDevice.get('name')}</td></tr>
                        <tr><td>ID</td><td>{props.activeDevice.get('id')}</td></tr>
                        <tr><td>Description</td><td>{props.activeDevice.get('description')}</td></tr>
                        <tr><td>Host</td><td>{props.activeDevice.get('host')}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
