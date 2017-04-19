/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const DeviceListElement = ({device, active}) => {
  return (
    <Link to={'/dashboard/devices/' + device.id}
          className={classNames(
            'list-group-item',
            'list-group-item-action',
            { active }
    )}>
      <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        {device.id}
      </div>
      <div className="col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        {device.name}
      </div>
    </Link>
  );
};

export default DeviceListElement;
