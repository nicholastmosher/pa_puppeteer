/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import DeviceCardView from './DeviceCardView';
import SinksCardView from './SinksCardView';
import ModulesCardView from './ModulesCardView';

function DeviceView(props) {
    return (
        <div>
            <h1 className="page-header">{props.activeDevice.get('name')}</h1>
            <DeviceCardView {...props}/>
            <SinksCardView {...props}/>
            <ModulesCardView {...props}/>
        </div>
    );
}

export default DeviceView;
