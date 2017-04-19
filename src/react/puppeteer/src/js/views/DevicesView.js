/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ListView from './ListView';
import DeviceListElement from './DeviceListElement';

const DevicesView = (props) => {
  const id = props.match.params.deviceId;
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <h1>Devices</h1>
      <ListView items={props.items(id)}/>
    </div>
  );
};

const mapStateToProps = ({DeviceReducer}) => {
  return {
    items: (id) => DeviceReducer.get('devices').valueSeq().map(d => (
      <DeviceListElement key={d.id} device={d} active={id === d.id}/>
    )),
  };
};

export default connect(mapStateToProps)(DevicesView);
