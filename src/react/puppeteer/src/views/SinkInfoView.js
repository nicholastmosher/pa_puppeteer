/**
 * Displays an individual panel describing a sink of the active device.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import '../stylesheets/SinkInfoView.css'

function SinkInfoView(props) {
    const headingSink = "headingSink" + props.sink.get('id').toString();
    const collapseSink = "collapseSink" + props.sink.get('id').toString();
    const accordion = "#" + props.accordion;
    return (
        <div className="panel panel-default">
            <div id={headingSink}
                 className="panel-heading"
                 role="tab" >
                <h5 className="panel-title">
                    <a data-toggle="collapse"
                       data-parent={accordion}
                       href={"#" + collapseSink}
                       aria-expanded="true"
                       aria-controls={collapseSink}>
                        <b>{props.sink.get('name')}</b>
                    </a>
                </h5>
            </div>
            <div id={collapseSink}
                 className="collapse in"
                 role="tabpanel"
                 aria-labelledby={headingSink}>
                <table className="table">
                    <tbody>
                        <tr><td>Name</td><td>{props.sink.get('name')}</td></tr>
                        <tr><td>ID</td><td>{props.sink.get('id')}</td></tr>
                        <tr><td>Description</td><td>{props.sink.get('description')}</td></tr>
                        <tr><td>Status</td><td>{props.sink.get('state')}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SinkInfoView;
