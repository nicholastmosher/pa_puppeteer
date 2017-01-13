/**
 * Displays an individual panel describing a sink of the active device.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import '../stylesheets/SinkInfoView.css'

export default function SinkCardView(props) {
    return (
        <div className="card">
            <div className="card-block">
                <h5 className="card-title"><b>{props.sink.get('name')}</b></h5>
            </div>
            <div>
                <table className="table">
                    <tbody>
                        <tr><td>ID</td><td>{props.sink.get('id')}</td></tr>
                        <tr><td>Description</td><td>{props.sink.get('description')}</td></tr>
                        <tr><td>Status</td><td>{props.sink.get('state')}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
