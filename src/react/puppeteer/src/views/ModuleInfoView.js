/**
 * Displays an individual panel describing a module of the active device.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

function ModuleInfoView(props) {
    const headingModule = "headingModule" + props.module.get('id').toString();
    const collapseModule = "collapseModule" + props.module.get('id').toString();
    const accordion = "#" + props.accordion;
    return (
        <div className="panel panel-default">
            <div id={headingModule}
                 className="panel-heading"
                 role="tab" >
                <h5 className="panel-title">
                    <a data-toggle="collapse"
                       data-parent={accordion}
                       href={"#" + collapseModule}
                       aria-expanded="true"
                       aria-controls={collapseModule}>
                        <b>{props.module.get('name')}</b>
                    </a>
                </h5>
            </div>
            <div id={collapseModule}
                 className="collapse in"
                 role="tabpanel"
                 aria-labelledby={headingModule}>
                <table className="table">
                    <tbody>
                    <tr><td>Name</td><td>{props.module.get('name')}</td></tr>
                    <tr><td>ID</td><td>{props.module.get('id')}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModuleInfoView;
