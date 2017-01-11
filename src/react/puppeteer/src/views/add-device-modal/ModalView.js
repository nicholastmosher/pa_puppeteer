/**
 * Renders a modal for gathering information to be used in
 * creating a new device data object.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React, { Component } from 'react';
import NameInputView from './NameInputView';
import DescInputView from './DescInputView';
import HostInputView from './HostInputView';

class ModalView extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            validName: true,
            desc: '',
            validDesc: false,
            host: '',
            validHost: true,
            validSubmit: () => this.state.validName && this.state.validHost,
        };
    }

    /**
     * Triggered whenever the name field is updated.
     * Checks whether the name is valid (non-empty) and sets
     * the state accordingly.
     */
    handleUpdateName = (e) => {
        const string = e.target.value.toString().trim();
        const regex = new RegExp(/^$|^\s+$/);
        if(!string.match(regex)) {
            this.setState({
                name: string,
                validName: true,
            });
        } else {
            this.setState({
                name: '',
                validName: false,
            });
        }
    };

    /**
     * Triggered whenever the description field is updated.
     * Checks whether the description is valid (non-empty)
     * and sets the state. The description is not required,
     * but recommended, so an empty description gives a warning.
     */
    handleUpdateDesc = (e) => {
        const string = e.target.value.toString().trim();
        const regex = new RegExp(/^$|^\s+$/);
        if(!string.match(regex)) {
            this.setState({
                desc: string,
                validDesc: false,
            });
        } else {
            this.setState({
                desc: '',
                validDesc: true,
            })
        }
    };

    /**
     * Triggered whenever the hostname field is updated.
     * Checks whether the typed hostname is a valid http
     * or https url.
     */
    handleUpdateHost = (e) => {
        const string = e.target.value.toString().trim();
        const regex = new RegExp(/https?:\/\/(www\.)?(([-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b)|localhost)([-a-zA-Z0-9@:%_+.~#?&\/=]*)/);
        if(string.match(regex)) {
            this.setState({
                host: string,
                validHost: true
            });
        }
        else if(!string.match(regex)) {
            this.setState({
                host: '',
                validHost: false
            });
        }
    };

    /**
     * Triggered when the user clicks the "add device" button.
     */
    handleSubmit = () => {
        if(this.state.validSubmit()) {
            console.log("Valid submit!");
            this.props.actions.addDevice(this.state.name, this.state.desc, this.state.host);
        } else {
            console.log("Submission not valid");
        }
    };

    render () {
        return (
            <div id={this.props.addDeviceModal}
                 className="modal fade"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="addDeviceLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="addDeviceLabel" className="modal-title"><b>Add Device</b></h5>
                        </div>
                        <div className="modal-body">
                            <NameInputView validName={this.state.validName}
                                           onUpdateName={this.handleUpdateName} />
                            <DescInputView validDesc={this.state.validDesc}
                                           onUpdateDesc={this.handleUpdateDesc} />
                            <HostInputView validHost={this.state.validHost}
                                           onUpdateHost={this.handleUpdateHost} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add device</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalView;
