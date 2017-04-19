/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ListView from './ListView';
import SinkListElement from './SinkListElement';

const SinksView = (props) => {
  const deviceId = props.match.params.deviceId;
  const sinkId = props.match.params.sinkId;
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <h1>Sinks</h1>
      <ListView items={props.items(deviceId, sinkId)}/>
    </div>
  );
};

const mapStateToProps = ({SinkReducer}) => {
  return {
    items: (deviceId, sinkId) =>
      SinkReducer.get('sinks')
                 .filter(s => s.device === deviceId)
                 .valueSeq()
                 .map(s => (
      <SinkListElement key={s.id}
                       deviceId={deviceId}
                       sink={s}
                       active={sinkId === s.id}/>
    )),
  };
};

export default connect(mapStateToProps)(SinksView);
