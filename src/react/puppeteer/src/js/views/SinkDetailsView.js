/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

const SinkDetailsView = (props) => {
  const id = props.match.params.sinkId;
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <h1>{props.sinkById(id).name}</h1>
      <p>{props.sinkById(id).description}</p>
      <p>{props.sinkById(id).status}</p>
    </div>
  );
};

const mapStateToProps = ({SinkReducer}) => ({
  sinkById: (id) => SinkReducer.getIn([ 'sinks', id ]),
});

export default connect(mapStateToProps)(SinkDetailsView);
