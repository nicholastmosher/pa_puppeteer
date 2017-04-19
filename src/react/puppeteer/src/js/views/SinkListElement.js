/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const SinkListElement = ({deviceId, sink, active}) => {
  return (
    <Link to={'/dashboard/devices/' + deviceId + '/sinks/' + sink.id}
          className={classNames(
            'list-group-item',
            'list-group-item-action',
            { active }
    )}>
      <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        {sink.id}
      </div>
      <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        {sink.name}
      </div>
    </Link>
  );
};

export default SinkListElement;
