/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

export default function DeviceCardView(props) {
    return (
        <div id="deviceHeader" className="col-md-12">
            <div className="card">
                <div className="card-block">
                    <div className="page-header">
                        <h1 className="card-title">{props.activeDevice.get('name')}</h1>
                        <h4>{props.activeDevice.get('description')}</h4>
                    </div>
                </div>
                <table className="table">
                    <tbody>
                    <tr><td>ID</td><td>{props.activeDevice.get('id')}</td></tr>
                    <tr><td>Host</td><td>{props.activeDevice.get('host')}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
