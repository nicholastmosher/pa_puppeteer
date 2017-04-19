/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ListView from './ListView';
import ModuleListElement from './ModuleListElement';

const ModulesView = (props) => {
  const deviceId = props.match.params.deviceId;
  const moduleId = props.match.params.moduleId;
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <h1>Modules</h1>
      <ListView items={props.items(deviceId, moduleId)}/>
    </div>
  );
};

const mapStateToProps = ({ModuleReducer}) => {
  return {
    items: (deviceId, moduleId) =>
      ModuleReducer.get('modules')
                 .filter(s => s.device === deviceId)
                 .valueSeq()
                 .map(m => (
      <ModuleListElement key={m.id}
                         deviceId={deviceId}
                         module={m}
                         active={moduleId === m.id}/>
    )),
  };
};

export default connect(mapStateToProps)(ModulesView);
