/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

const ModuleDetailsView = (props) => {
  const id = props.match.params.moduleId;
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <h1>{props.moduleById(id).name}</h1>
      {props.moduleById(id).args.entrySeq(([arg, value]) => (
        <p key={arg}>{arg}: {value}</p>
      ))}
    </div>
  );
};

const mapStateToProps = ({ModuleReducer}) => ({
  moduleById: (id) => ModuleReducer.getIn([ 'modules', id ]),
});

export default connect(mapStateToProps)(ModuleDetailsView);
