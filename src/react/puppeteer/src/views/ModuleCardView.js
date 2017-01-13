/**
 * Displays an individual panel describing a module of the active device.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

export default function ModuleCardView(props) {
    const collapse = "collapse" + props.module.get('id').toString();
    const args = !props.module.has('args') ? null :
        props.module.get('args').map((key, value) => <tr><td>{value}</td><td>{key}</td></tr>);
    return (
        <div className="card">
            <div className="card-block">
                <h5 className="card-title"><b>{props.module.get('name')}</b></h5>
            </div>
            <div>
                <table className="table">
                    <tbody>
                        <tr><td>ID</td><td>{props.module.get('id')}</td></tr>
                        <tr><td><a href={"#" + collapse} data-toggle="collapse">Args ({props.module.has('args') ? props.module.get('args').size : 0})</a></td><td></td></tr>
                        <div id={collapse} className="collapse in">
                            {args}
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
