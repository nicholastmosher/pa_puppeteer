/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import DeviceCardView from './DeviceCardView';
import SinksSectionView from './SinksSectionView';
import ModulesSectionView from './ModulesSectionView';

export default function DeviceView(props) {
    return (
        <div>
            <DeviceCardView {...props} />
            <SinksSectionView {...props} />
            <ModulesSectionView {...props} />
        </div>
    );
}
