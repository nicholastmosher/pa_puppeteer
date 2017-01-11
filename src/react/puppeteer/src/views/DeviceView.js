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
            <div className="page-header">
                <h1>{props.activeDevice.get('name')}</h1>
                <h4>{props.activeDevice.get('description')}</h4>
            </div>
            <DeviceCardView {...props}/>
            <SinksCardView {...props}/>
            <ModulesCardView {...props}/>
        </div>
    );
}

export default DeviceView;
