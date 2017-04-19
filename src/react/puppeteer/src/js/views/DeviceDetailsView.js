/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

const DeviceDetailsView = (props) => {
  const id = props.match.params.deviceId;
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <h1>{props.deviceById(id).name}</h1>
      <p>{props.deviceById(id).description}</p>
      <p>{props.deviceById(id).host}</p>
      <h2>Sinks</h2>
      {props.sinks(id).valueSeq().map(s => <p key={s.id}>{s.id + ' ' + s.name}</p>)}
      <h2>Modules</h2>
      {props.modules(id).valueSeq().map(m => <p key={m.id}>{m.id + ' ' + m.name}</p>)}
    </div>
  );
};

const mapStateToProps = ({DeviceReducer, SinkReducer, ModuleReducer}) => ({
  deviceById: (id) => DeviceReducer.getIn([ 'devices', id ]),
  sinks: (id) => SinkReducer.get('sinks').filter(s => s.device === id),
  modules: (id) => ModuleReducer.get('modules').filter(m => m.device === id),
});

export default connect(mapStateToProps)(DeviceDetailsView);
