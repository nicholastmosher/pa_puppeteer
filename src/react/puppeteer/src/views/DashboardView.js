/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React, { Component } from 'react';
import DeviceListView from './DeviceListView';
import DeviceView from './DeviceView';
import ModalView from './add-device-modal/ModalView';
import $ from 'jquery';
import { fromJS } from 'immutable';
import '../stylesheets/DashboardView.css';

/**
 * Encapsulates the top navigation bar and the contents of the page.
 * @param props
 */
export default class DashboardView extends Component {
    componentDidMount() {
        this.props.devices.forEach(device => {
            $.ajax({
                url: device.get('host') + "/v1/sinks",
                method: "GET",
                accepts: "application/json",
                contentType: "application/json",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("nick:something"));
                },
                error: (jqXHR) => {
                    console.log("Ajax sink error: " + jqXHR.status);
                }
            }).done((data) => {
                this.props.actions.updateSinks(device.get('id'), fromJS(data['sinks']));
            });

            $.ajax({
                url: device.get('host') + "/v1/modules",
                method: "GET",
                accepts: "application/json",
                contentType: "application/json",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("nick:something"));
                },
                error: (jqXHR) => {
                    console.log("Ajax module error: " + jqXHR.status);
                }
            }).done((data) => {
                this.props.actions.updateModules(device.get('id'), fromJS(data['modules']));
            });
        });
    }

    handleAddDevice = (name, desc, host) => {
        if (name.length === 0 || host.length === 0) {
            return;
        }
        this.props.actions.addDevice(name, desc, host);
    };

    handleSwitchDevice = (props, id) => {
        props.actions.setActive(id);
    };

    render() {
        const addDeviceModal = "AddDeviceModal";
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Pulse Audio Puppeteer</a>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-2 sidebar">
                            <DeviceListView addDeviceModal={addDeviceModal}
                                            onSwitchDevice={this.handleSwitchDevice} {...this.props} />
                        </div>
                        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                            <DeviceView onAddDevice={this.handleAddDevice} {...this.props} />
                        </div>
                    </div>
                </div>
                <ModalView addDeviceModal={addDeviceModal}
                           {...this.props} />
            </div>
        );
    }
}
