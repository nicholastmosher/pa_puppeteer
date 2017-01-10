/**
 * Renders a modal for gathering information to be used in
 * creating a new device data object.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

function AddDeviceModalView(props) {
    return (
        <div id={props.addDeviceModal}
             className="modal fade"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="addDeviceLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 id="addDeviceLabel" className="modal-title">Add Device</h5>
                    </div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Add device</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDeviceModalView;
